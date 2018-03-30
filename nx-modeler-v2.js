(function ($, undefined) {
  
  function _uuid (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
   
    if (len) {
     // Compact form
     for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
     // rfc4122, version 4 form
     var r;
   
     // rfc4122 requires these characters
     uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
     uuid[14] = '4';
   
     // Fill in random data. At i==19 set the high bits of clock sequence as
     // per rfc4122, sec. 4.1.5
     for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
       r = 0 | Math.random()*16;
       uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
     }
    }
    return 'sid-'+uuid.join('');
  }

  var Node = function (opt) {
    this.resourceId = _uuid();
    this.isCommiter = opt.isCommiter ? opt.isCommiter : false;
    this.assignee = opt.assignee ? opt.assignee : '';
    this.name = opt.name ? opt.name : '';

    // StartNoneEvent, EndNoneEvent, UserTask, ParallelGateway
    this.type = opt.type ? opt.type : 'UserTask';
    // fork, join
    this.gatewayType = opt.gatewayType ? opt.gatewayType : '';
    this.incoming = opt.incoming ? opt.incoming : [];
    this.outgoing = opt.outgoing ? opt.outgoing : [];
  };

  Node.prototype = {
    constructor: Node,
    toJSON: function () {
      var model = {
        'resourceId': this.resourceId,
        'properties': {
          'formkeydefinition': this.type === 'UserTask' ? (this.isCommiter ? 'mcDiyForm01' : 'mcDiyForm02') : '',
          'isCommiter': this.isCommiter,
          'assignee': this.assignee.toString(),
          'name': this.name,
          'gatewayType': this.gatewayType
        },
        'stencil': {
          'id': this.type
        },
        'incoming': [],
        'outgoing': [],
        'bounds': {
          'upperLeft': {
            'x': this.x,
            'y': this.y
          },
          'lowerRight': {
            'x': this.x + defaults.config.node.w,
            'y': this.y + defaults.config.node.h
          }
        }
      }
      this.incoming.forEach(function(line){
        model.incoming.push({resourceId: line.resourceId});
      });
      this.outgoing.forEach(function(line){
        model.outgoing.push({resourceId: line.resourceId});
      });
      return model;
    },
    toDOM: function () {
      var node_class = defaults.config.task_class;
      var icon_class = defaults.config.task_icon_class;
      if (this.type === 'StartNoneEvent' || this.type === 'EndNoneEvent') {
        node_class = defaults.config.event_class;
        icon_class = defaults.config.event_icon_class;
      } else if (this.type === 'ParallelGateway') {
        node_class = defaults.config.gateway_class;
        icon_class = defaults.config.gateway_icon_class;
      }
      var $node = $('<div id="'+defaults.config.prefix+this.resourceId+'"></div>');
      $node.append($('<span class="glyphicon '+icon_class+'"></span>'));
      if(this.name){
        var $label = $('<span class="nxmodeler-usertask-label">'+(this.name?this.name:'')+'</span>');
        $label.css({ 'top': (defaults.config.node.h - 2 - 20) / 2 + 'px' });
        $node.append($label);
      }
      if(this.type !== 'StartNoneEvent' && this.type !== 'EndNoneEvent' && this.gatewayType !== 'fork'){
        $node.addClass('nxmodeler-node');
      }
      $node.addClass(node_class).css({ 'left': this.x + 'px', 'top': this.y + 'px' , 'width': defaults.config.node.w + 'px', 'height': defaults.config.node.h + 'px' });
      if (this.type === 'ParallelGateway') {
        $node.find('.glyphicon').css({ 'top': (defaults.config.node.h - 2 - 20) / 2 + 'px', 'left': (defaults.config.node.w - 20) / 2 + 'px' });
      }
      $node.data('nxnode', this)

      return $node;
    }
  };

  var Line = function (opt) {
    this.resourceId = _uuid();
    this.source = opt.source;
    this.target = opt.target;
  };

  Line.prototype = {
    constructor: Line,
    toJSON: function () {
      return {
        'resourceId': this.resourceId,
        'properties': {
          'name': '',
          'defaultflow': 'false'
        },
        'stencil': {
          'id': 'SequenceFlow'
        },
        'source': {
          'resourceId': this.source.resourceId
        },
        'target': {
          'resourceId': this.target.resourceId
        },
        'outgoing': [
          {'resourceId': this.target.resourceId}
        ],
        'dockers': [
          {
            'x': this.source.x + defaults.config.node.w, // TODO 兼容Activiti设计器的docker坐标算法
            'y': this.source.y + defaults.config.node.h / 2
          },
          {
            'x': this.target.x,
            'y': this.target.y + defaults.config.node.h / 2
          }
        ]
      }
    }
  };

  var Modeler = function (el, opt) {
    this.el = el;
    this.opt = opt;
    this.process_id = '';
    this.name = '';
    this.nodes = [];
    this.nodeMap = {};
    this.lines = [];
    this.lineMap = {};
    this.root = undefined;

    if (!opt.model) {
      var start = new Node({type: 'StartNoneEvent', name: '开始'});
      var commiter = new Node({isCommiter: true, assignee: opt.commiter.assignee, name: opt.commiter.name});
      var end = new Node({type: 'EndNoneEvent', name: '结束'});
      this.nodes.push(start);
      this.nodeMap[start.resourceId] = start;
      this.nodes.push(commiter);
      this.nodeMap[commiter.resourceId] = commiter;
      this.nodes.push(end);
      this.nodeMap[end.resourceId] = end;

      var line1 = new Line({source: start, target: commiter});
      start.outgoing.push(line1);
      commiter.incoming.push(line1);
      this.lines.push(line1);
      this.lineMap[line1.resourceId] = line1;
      var line2 = new Line({source: commiter, target: end});
      commiter.outgoing.push(line2);
      end.incoming.push(line2);
      this.lines.push(line2);
      this.lineMap[line2.resourceId] = line2;
    } else {
      if (opt.model.properties) {
        if (opt.model.properties.process_id) this.process_id = opt.model.properties.process_id;
        if (opt.model.properties.name) this.name = opt.model.properties.name;
      }

      // TODO Node和Line新增了一些属性，下面这段需要修改

      opt.model.childShapes.forEach(function(el){
        if (el.stencil.id !== 'SequenceFlow') {
          var node = new Node({type: el.type, isCommiter: el.isCommiter, assignee: el.properties.assignee, name: el.properties.name});
          this.nodes.push(node);
          this.nodeMap[node.resourceId] = node;
        }
      });

      opt.model.childShapes.forEach(function(el){
        if (el.stencil.id === 'SequenceFlow') {
          var line = new Line({source: this.nodeMap[el.source.resourceId], target: this.nodeMap[el.target.resourceId]});
          this.lines.push(line);
          this.lineMap[line.resourceId] = line;
        }
      });

      opt.model.childShapes.forEach(function(el){
        if (el.stencil.id !== 'SequenceFlow') {
          var node = this.nodeMap[el.resourceId];
          el.incoming.forEach(function(line){
            node.incoming.push(this.lineMap[line.resourceId]);
          });
          el.outgoing.forEach(function(line){
            node.outgoing.push(this.lineMap[line.resourceId]);
          });
        }
      });
    }

    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].type === 'StartNoneEvent') {
        this.root = this.nodes[i];
        break;
      }
    }
  };

  Modeler.prototype = {
    constructor: Modeler,
    _addNodes: function () {
      var that = this;
      var $el = $(this.el);

      // 初始化节点坐标、层级
      this.nodes.forEach(function(node){node.x = 0; node.y = 0; node.level = 0; node.visited = false;});
      // 初始化连线的权重
      this.lines.forEach(function(line){line.weight = 1; line.visited = false;});

      // 广度优先遍历，求节点到根的最大深度
      var nodeStack = [this.root];
      while (nodeStack.length) {
        var curNode = nodeStack.shift();
        curNode.outgoing.forEach(function(line){
          var nextNode = line.target;
          if (nextNode.level < curNode.level + 1) {
            nextNode.level = curNode.level + 1;
          }
          nodeStack.push(nextNode);
        });
      }
      // 根据最大深度计算节点x轴坐标
      var max_x = 0;
      this.nodes.forEach(function(node){
        node.x = node.level * that.opt.config.distance.x;
        if (node.x > max_x) {max_x = node.x;}
      });

      // 深度优先遍历，统计分支权重
      var pathStack = [];
      function computeWeight (curNode) {
        if (curNode.gatewayType === 'fork') {
          // 分支节点
          // 从栈顶开始进行回溯，对祖先分支进行提权
          var jump_count = 0;
          for (var i = pathStack.length - 1; i >= 0; i--) {
            var path = pathStack[i];
            if (path.source.gatewayType === 'fork') {
              // 分支节点
              if (jump_count === 0) {
                // 将栈中尚未闭合的分支（当前节点的祖先）权重按照当前节点权重-1进行提升（因为祖先节点已经为当前节点所在分支计了1权重）
                path.weight += (curNode.outgoing.length - 1);
                break;
              } else {
                jump_count -= 1;
              }
            } else {
              // 聚合节点
              jump_count += 1;
            }
          }
        }
        curNode.outgoing.forEach(function(line){
          if (curNode.gatewayType === 'fork' || curNode.gatewayType === 'join') {
            pathStack.push(line);
          }
          computeWeight(line.target);
          if (curNode.gatewayType === 'fork' || curNode.gatewayType === 'join') {
            pathStack.pop();
          }
        });
      }
      computeWeight(this.root);

      // 根据之前统计的分支节点权重计算其各子节点y轴坐标
      var min_y = 0, max_y = 0, forkJoinStack = [];
      function computeAxis (curNode) {
        console.debug('深度优先遍历2, curNode: ', curNode);
        if (curNode.gatewayType === 'fork' || curNode.gatewayType === 'join') {
          forkJoinStack.push(curNode);
        }
        console.debug('深度优先遍历2, forkJoinStack: ', forkJoinStack);
        var sum_weight = 0;
        curNode.outgoing.forEach(function(line){sum_weight += line.weight;});
        var offset = 0, range = (sum_weight - 1) * that.opt.config.distance.y;
        curNode.outgoing.forEach(function(line){
          var nextNode = line.target;
          if (nextNode.gatewayType === 'join') {
            // 聚合节点，从栈顶开始查找与当前节点成对的分支节点
            var jump_count = 0;
            for (var i = forkJoinStack.length - 1; i >= 0; i--) {
              var forkOrJoin = forkJoinStack[i];
              console.debug('深度优先遍历2, 回溯forkOrJoin: ', forkOrJoin);
              if (forkOrJoin.outgoing.length > 1) {
                // 分支节点
                if (jump_count === 0) {
                  nextNode.y = forkOrJoin.y;
                  break;
                } else {
                  jump_count -= 1;
                }
              } else {
                // 聚合节点
                jump_count += 1;
              }
            }
          } else if (curNode.gatewayType !== 'fork') {
            nextNode.y = curNode.y;
          } else {
            console.debug('深度优先遍历2, sum_weight: %s, range: %s, offset: %s', sum_weight, range, offset);
            nextNode.y = curNode.y + offset - parseInt((1 - line.weight / sum_weight) * range / 2);
            offset += parseInt(range * line.weight / sum_weight);
          }
          if (nextNode.y < min_y) {min_y = nextNode.y;}
          if (nextNode.y > max_y) {max_y = nextNode.y;}
          computeAxis(nextNode);
        });
        if (curNode.gatewayType === 'fork' || curNode.gatewayType === 'join') {
          forkJoinStack.pop();
        }
      }
      computeAxis(this.root);

      this.nodes.forEach(function(node){
        node.x += that.opt.config.padding;
        node.y += (0 - min_y) + that.opt.config.padding;
      });
      this.width = max_x + that.opt.config.node.w + that.opt.config.padding * 2;
      this.height = max_y - min_y + that.opt.config.node.h + that.opt.config.padding * 2;
      $el.css({ 'width': this.width + 'px', 'height': this.height + 'px' });

      // 添加向容器中添加dom
      this.nodes.forEach(function(node){
        $el.append(node.toDOM());
      });
    },
    _addEndpoints: function () {
      var config = this.opt.config;
      var instance = this.instance;

      this.nodes.forEach(function(node){
        if(node.type !== 'EndNoneEvent'){
          instance.addEndpoint(config.prefix+node.resourceId, config.sourceEndpoint, {
            anchor: 'Right',
            uuid: node.resourceId+'-Right'
          });
        }
        if(node.type !== 'StartNoneEvent'){
          instance.addEndpoint(config.prefix+node.resourceId, config.targetEndpoint, {
            anchor: 'Left',
            uuid: node.resourceId+'-Left'
          });
        }
        if(node.type === 'ParallelGateway'){
          if (node.outgoing.length > 1) {
            instance.addEndpoint(config.prefix+node.resourceId, config.sourceEndpoint, {
              anchor: 'Top',
              uuid: node.resourceId+'-Top'
            });
            instance.addEndpoint(config.prefix+node.resourceId, config.sourceEndpoint, {
              anchor: 'Bottom',
              uuid: node.resourceId+'-Bottom'
            });
          } else {
            instance.addEndpoint(config.prefix+node.resourceId, config.targetEndpoint, {
              anchor: 'Top',
              uuid: node.resourceId+'-Top'
            });
            instance.addEndpoint(config.prefix+node.resourceId, config.targetEndpoint, {
              anchor: 'Bottom',
              uuid: node.resourceId+'-Bottom'
            });
          }
        }
      });
    },
    _connect: function () {
      var config = this.opt.config;
      var instance = this.instance;

      this.lines.forEach(function(line){
        var anchors = ['Right', 'Left'];
        if (line.source.gatewayType === 'fork') {
          if (line.source.y > line.target.y) {
            anchors[0] = 'Top';
          } else if (line.source.y < line.target.y) {
            anchors[0] = 'Bottom';
          }
        }
        if (line.target.gatewayType === 'join') {
          if (line.source.y > line.target.y) {
            anchors[1] = 'Bottom';
          } else if (line.source.y < line.target.y) {
            anchors[1] = 'Top';
          }
        }

        var connection = instance.connect({
          uuids: [line.source.resourceId +'-'+ anchors[0], line.target.resourceId +'-'+ anchors[1]],
          editable: config.editable
        });
      });
    },
    _deleteNodeAndLine: function (node) {
      var incoming = node.incoming[0];
      var outgoing = node.outgoing[0];

      // 从上一节点outgoing中删除到当前节点的连线
      var prevNode = incoming.source;
      for (var i = 0; i < prevNode.outgoing.length; i++) {
        if (prevNode.outgoing[i].resourceId === incoming.resourceId) {
          prevNode.outgoing.splice(i, 1);
          break;
        }
      }

      // 从model中删除上一节点到当前节点的连线
      for (var i = 0; i < this.lines.length; i++) {
        if (this.lines[i].resourceId === incoming.resourceId) {
          this.lines.splice(i, 1);
          break;
        }
      }
      delete this.lineMap[incoming.resourceId];

      // 从model中删除当前节点
      for (var i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].resourceId === node.resourceId) {
          this.nodes.splice(i, 1);
          break;
        }
      }
      delete this.nodeMap[node.resourceId];

      var nextNode = outgoing.target;
      if (prevNode.gatewayType === 'fork' && nextNode.gatewayType === 'join') {
        // 如果前后分别是分支和聚合，则删除当前节点的outgoing
        for (var i = 0; i < nextNode.incoming.length; i++) {
          if (nextNode.incoming[i].resourceId === outgoing.resourceId) {
            nextNode.incoming.splice(i, 1);
            break;
          }
        }
        for (var i = 0; i < this.lines.length; i++) {
          if (this.lines[i].resourceId === outgoing.resourceId) {
            this.lines.splice(i, 1);
            break;
          }
        }
        delete this.lineMap[outgoing.resourceId];
      } else {
        // 将当前节点的outgoing的source改为上一节点
        outgoing.source = prevNode;
        prevNode.outgoing.push(outgoing);
      }
    },
    _init: function () {
      this.instance = jsPlumb.getInstance({
        ConnectionOverlays: [
          ["Arrow", {//箭头的样式
            location: 1,
            visible: true,
            width: 11,
            length: 11,
            id: "ARROW",
          }],
          ["Label", {//连线上的label
            location: 0.4,
            id: "label",
            cssClass: "aLabel",
          }]
        ],
        Container: this.el.id //画布容器
      });
    },
    _destroy: function () {
      this.instance = null;
      $(this.el).html('');
    },
    render: function () {
      this._destroy();
      this._init();
      this._addNodes();
      this._addEndpoints();
      this._connect();
    },
    addSerialNodes: function (curNode, nodes) {
      var curOutgoing = curNode.outgoing[0];
      curNode.outgoing = [];
      var tmp = curNode;
      for (var i=0; i<nodes.length; i++) {
        var newNode = new Node({assignee: nodes[i].assignee, name: nodes[i].name});
        var newLine = new Line({source: tmp, target: newNode});
        tmp.outgoing.push(newLine);
        newNode.incoming.push(newLine);
        this.nodes.push(newNode);
        this.nodeMap[newNode.resourceId] = newNode;
        this.lines.push(newLine);
        this.lineMap[newLine.resourceId] = newLine;
        tmp = newNode;
      }
      curOutgoing.source = tmp;
      tmp.outgoing.push(curOutgoing);
    },
    addParallelNodes: function (curNode, nodes) {
      var curOutgoing = curNode.outgoing[0];

      var forkNode = new Node({type: 'ParallelGateway', gatewayType: 'fork'});
      var forkIncoming = new Line({source: curNode, target: forkNode});
      forkNode.incoming.push(forkIncoming);
      curNode.outgoing = [forkIncoming];
      this.nodes.push(forkNode);
      this.nodeMap[forkNode.resourceId] = forkNode;
      this.lines.push(forkIncoming);
      this.lineMap[forkIncoming.resourceId] = forkIncoming;

      var joinNode = new Node({type: 'ParallelGateway', gatewayType: 'join', outgoing: [curOutgoing]});
      curOutgoing.source = joinNode;
      this.nodes.push(joinNode);
      this.nodeMap[joinNode.resourceId] = joinNode;

      for (var i=0; i<nodes.length; i++) {
        var newNode = new Node({assignee: nodes[i].assignee, name: nodes[i].name});
        var incoming = new Line({source: forkNode, target: newNode});
        var outgoing = new Line({source: newNode, target: joinNode});
        newNode.incoming.push(incoming);
        newNode.outgoing.push(outgoing);
        forkNode.outgoing.push(incoming);
        joinNode.incoming.push(outgoing);
        this.nodes.push(newNode);
        this.nodeMap[newNode.resourceId] = newNode;
        this.lines.push(incoming);
        this.lineMap[incoming.resourceId] = incoming;
        this.lines.push(outgoing);
        this.lineMap[outgoing.resourceId] = outgoing;
      }
    },
    deleteNode: function (curNode) {
      // 删除节点和连线
      this._deleteNodeAndLine(curNode);

      // 如果前后的分支和聚合之间只剩下一条分支，则删除这对分支和聚合节点
      var tmp, fork, join;
      tmp = curNode.incoming[0].source;
      while (tmp.gatewayType != 'fork' && tmp.type !== 'StartNoneEvent') {
        tmp = tmp.incoming[0].source;
      }
      if (tmp.gatewayType === 'fork') {
        fork = tmp;
      }

      tmp = curNode.outgoing[0].target;
      while (tmp.gatewayType != 'join' && tmp.type !== 'EndNoneEvent') {
        tmp = tmp.outgoing[0].target;
      }
      if (tmp.gatewayType === 'join') {
        join = tmp;
      }

      if (fork && fork.outgoing.length === 1 && join && join.incoming.length === 1) {
        // 删除fork
        this._deleteNodeAndLine(fork);
        // 删除join
        this._deleteNodeAndLine(join);
      }
    },
    toJSON: function () {
      var model = {
        "resourceId": "",
        "properties": {
          "process_id": "",
          "name": ""
        },
        "stencil": {
          "id": "BPMNDiagram"
        },
        "childShapes": [],
        "bounds": {
          "lowerRight": {
            "x": 1200,
            "y": 1050
          },
          "upperLeft": {
            "x": 0,
            "y": 0
          }
        },
        "stencilset": {
          "url": "stencilsets/bpmn2.0/bpmn2.0.json",
          "namespace": "http://b3mn.org/stencilset/bpmn2.0#"
        },
        "ssextensions": []
      }
      this.nodes.forEach(function(node){model.childShapes.push(node.toJSON())});
      this.lines.forEach(function(line){model.childShapes.push(line.toJSON())});
      model.properties.process_id = this.process_id;
      model.properties.name = this.name;
      model.bounds.lowerRight = {x: this.width, y: this.height};
      return model;
    }
  }

  var defaults = {
    modelName: '',
    model: undefined,
    config: {
      prefix: 'nx_',//对应html里节点的ID前缀
      distance: {x: 120, y: 240},//对应html里节点之间的间隔
      node: {w: 56, h: 56},//对应html里节点的宽度和高度
      padding: 40,//对应html里节点的宽度和高度
      task_class: 'nxmodeler-usertask',
      task_icon_class: 'glyphicon-user',
      event_class: 'nxmodeler-eventnode',
      event_icon_class: '',//'glyphicon-flag',
      gateway_class: 'nxmodeler-gateway',
      gateway_icon_class: 'glyphicon-plus',
      elementName: 'node',
      editable: false,
      sourceEndpoint: {
        endpoint: "Dot",
        paintStyle: {
          // stroke: "#7AB02C",
          // fill: "transparent",
          radius: 7,
          strokeWidth: 0
        },
        isSource: true,
        // connector: ["Straight"],
        connector: ["Flowchart", {
          // stub: [40, 60],
          // gap: 10,
          // cornerRadius: 0,//连线的弯曲度
          // alwaysRespectStubs: true
        }],
        connectorStyle: {//流程图的线
          strokeWidth: 1,
          stroke: "#61B7CF",
          joinstyle: "round",
          outlineStroke: "white",
          outlineWidth: 0
        },
        connectorHoverStyle: {
          strokeWidth: 1,
          stroke: "#216477",
          outlineStroke: "white",
          outlineWidth: 0
        },
        maxConnections: 999,
      },
      targetEndpoint: {
        endpoint: "Dot",
        paintStyle: {
          // fill: "#7AB02C",
          radius: 7
        },
        maxConnections: 999,
        isTarget: true,
      }
    },
    onSave: function(modelName, model){
      console.debug('modelName: ' + modelName);
      console.debug(JSON.stringify(model, null, 2));
    },
    container_template: '<div class="nxmodeler-container">'+
    '  <nav class="navbar navbar-default">'+
    '    <div class="container-fluid">'+
    '      <div class="collapse navbar-collapse">'+
    '        <form class="navbar-form navbar-right">'+
    '          <button type="button" class="btn btn-primary nxmodeler-btn-save">保存</button>'+
    '        </form>'+
    '      </div>'+
    '    </div>'+
    '  </nav>'+
    '  <div class="nxmodeler-wrap"></div>'+
    '</div>',
    userpicker_template:'<div class="modal fade nxmodeler-userpicker" tabindex="-1" role="dialog">'+
    '  <div class="modal-dialog modal-lg" role="document">'+
    '    <div class="modal-content">'+
    '      <div class="modal-header">'+
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
    '        <h4 class="modal-title"></h4>'+
    '      </div>'+
    '      <div class="modal-body">'+
    '        <div class="row">'+
    '          <div class="col-md-6" style="border-right: 1px solid #ddd;">'+
    '            <div class="row">'+
    '              <div class="col-md-12" style="border-bottom: 1px solid #ddd;">'+
    '                <ul class="ztree nxmodeler-userpicker-tree" style="height: 220px;"></ul>'+
    '              </div>'+
    '              <div class="col-md-12" style="height: 271px;">'+
    '                <table class="table table-striped table-bordered table-hover table-condensed nowrap nxmodeler-userpicker-table" cellspacing="0" width="100%">'+
    '                  <thead>'+
    '                    <tr>'+
    '                      <th>姓名</th>'+
    '                      <th>登录名</th>'+
    '                      <th>部门</th>'+
    '                      <th></th>'+
    '                    </tr>'+
    '                  </thead>'+
    '                </table>'+
    '              </div>'+
    '            </div>'+
    '          </div>'+
    '          <div class="col-md-6">'+
    '            <table class="table table-striped table-bordered table-hover table-condensed nowrap nxmodeler-userpicker-select" cellspacing="0" width="100%">'+
    '              <thead>'+
    '                <tr>'+
    '                  <th>姓名</th>'+
    '                  <th>登录名</th>'+
    '                  <th>部门</th>'+
    '                  <th></th>'+
    '                </tr>'+
    '              </thead>'+
    '            </table>'+
    '          </div>'+
    '        </div>'+
    '      </div>'+
    '      <div class="modal-footer">'+
    '        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
    '        <button type="button" class="btn btn-primary">确定</button>'+
    '      </div>'+
    '    </div>'+
    '  </div>'+
    '</div>',
    save_dialog_template:'<div class="modal fade nxmodeler-save-dialog" tabindex="-1" role="dialog">'+
    '  <div class="modal-dialog" role="document">'+
    '    <div class="modal-content">'+
    '      <div class="modal-header">'+
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
    '        <h4 class="modal-title">保存流程</h4>'+
    '      </div>'+
    '      <div class="modal-body">'+
    '        <div class="row">'+
    '          <div class="col-md-12">'+
    '            <form>'+
    '              <div class="form-group">'+
    '                <label for="nxmodeler-userpicker-processname">流程名称</label>'+
    '                <input class="form-control nxmodeler-userpicker-processname">'+
    '              </div>'+
    '            </form>'+
    '          </div>'+
    '        </div>'+
    '      </div>'+
    '      <div class="modal-footer">'+
    '        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
    '        <button type="button" class="btn btn-primary">确定</button>'+
    '      </div>'+
    '    </div>'+
    '  </div>'+
    '</div>',
    alert_template:'<div class="modal fade nxmodeler-alert" tabindex="-1" role="dialog">'+
    '  <div class="modal-dialog" role="document">'+
    '    <div class="modal-content">'+
    '      <div class="modal-header">'+
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
    '        <h4 class="modal-title">错误</h4>'+
    '      </div>'+
    '      <div class="modal-body">'+
    '        <p class="nxmodeler-alert-message"></p>'+
    '      </div>'+
    '      <div class="modal-footer">'+
    '      </div>'+
    '    </div>'+
    '  </div>'+
    '</div>',
    commiter: {
      "assignee": "0001",
      "name": "发起人"
    }
  };

  $.fn.nxmodeler = function (option) {
    var args = Array.apply(null, arguments);
    args.shift();
    var internal_return;
    this.each(function () {
      var that = this;
      var $el = $(this),
        data = $el.data('nxmodeler'),
        options = typeof option === 'object' && option;
      if (!data) {
        var opts = $.extend({}, defaults, options);

        var $wrap = $(opts.container_template);
        $wrap.insertBefore($el);
        $wrap.find('.nxmodeler-wrap').append($el);
        $el.addClass('nxmodeler-canvas')
      }

      var $userpicker = $(opts.userpicker_template);
      $wrap.append($userpicker);
      var $saveDialog = $(opts.save_dialog_template);
      $wrap.append($saveDialog);
      var $alert = $(opts.alert_template);
      $wrap.append($alert);

      var zTreeObj, table;
      // mock部门树
      var ztree_settings = {
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: function (event, treeId, treeNode) {
            table.clear();
            table.rows.add(table_data);
            table.draw();
          }
        }
      };
      var ztree_data =[
        { id:1, pId:0, name:"父节点1 - 展开", open:"true"},
        { id:11, pId:1, name:"父节点11 - 折叠"},
        { id:111, pId:11, name:"叶子节点111"},
        { id:112, pId:11, name:"叶子节点112"},
        { id:113, pId:11, name:"叶子节点113"},
        { id:114, pId:11, name:"叶子节点114"},
        { id:12, pId:1, name:"父节点12 - 折叠"},
        { id:121, pId:12, name:"叶子节点121"},
        { id:122, pId:12, name:"叶子节点122"},
        { id:123, pId:12, name:"叶子节点123"},
        { id:124, pId:12, name:"叶子节点124"},
        { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
        { id:2, pId:0, name:"父节点2 - 折叠"},
        { id:21, pId:2, name:"父节点21 - 展开", open:true},
        { id:211, pId:21, name:"叶子节点211"},
        { id:212, pId:21, name:"叶子节点212"},
        { id:213, pId:21, name:"叶子节点213"},
        { id:214, pId:21, name:"叶子节点214"},
        { id:22, pId:2, name:"父节点22 - 折叠"},
        { id:221, pId:22, name:"叶子节点221"},
        { id:222, pId:22, name:"叶子节点222"},
        { id:223, pId:22, name:"叶子节点223"},
        { id:224, pId:22, name:"叶子节点224"},
        { id:23, pId:2, name:"父节点23 - 折叠"},
        { id:231, pId:23, name:"叶子节点231"},
        { id:232, pId:23, name:"叶子节点232"},
        { id:233, pId:23, name:"叶子节点233"},
        { id:234, pId:23, name:"叶子节点234"},
        { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
      ];      
      zTreeObj = $.fn.zTree.init($(".nxmodeler-userpicker-tree", $userpicker), ztree_settings, ztree_data);

      // mock人员列表
      var table_data = [
        {DISPLAYNAME: "俞新海", USERNAME: "yuxinhai", ID: 1049, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "冯宇鹏", USERNAME: "fengyupeng", ID: 1071, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "庞泓", USERNAME: "panghong", ID: 1072, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "李亮", USERNAME: "liliang", ID: 1069, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "李强", USERNAME: "liqiang", ID: 1096, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "杜佳鹏", USERNAME: "dujiapeng", ID: 817031254523904, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "王哲", USERNAME: "wangzhe", ID: 973876359495680, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "王跃", USERNAME: "wangyue", ID: 817031819214848, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "郭宏波", USERNAME: "guohongbo", ID: 829431494967296, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "马磊", USERNAME: "malei", ID: 1068, PARTYNAME: "信息部-java开发组"},
        {DISPLAYNAME: "马辰", USERNAME: "machen", ID: 1070, PARTYNAME: "信息部-java开发组"}
      ];
      table = $('.nxmodeler-userpicker-table').DataTable({
        language: {url: "lib/DataTables-Bootstrap3/1.10.16/i18n/Chinese.json"},
        select: false,
        paging: false,
        searching: false,
        sorting: false,
        info: false,
        scrollY: 230,
        scrollCollapse: true,
        columns: [
          { data: 'DISPLAYNAME' },
          { data: 'USERNAME' },
          { data: 'PARTYNAME' },
          { data: '' }
        ],
        columnDefs: [
          {
            targets: -1,
            render: function ( data, type, row ) {
              return '<div class="btn-group btn-group-xs"><button type="button" class="btn btn-default btn-plus"><span class="glyphicon glyphicon-plus"></span></button></div>';
            }
          }
        ]
      });

      // 人员选取列表
      var select_table = $('.nxmodeler-userpicker-select').DataTable({
        language: {url: "lib/DataTables-Bootstrap3/1.10.16/i18n/Chinese.json"},
        select: false,
        paging: false,
        searching: false,
        sorting: false,
        info: false,
        columns: [
          { data: 'DISPLAYNAME' },
          { data: 'USERNAME' },
          { data: 'PARTYNAME' },
          { data: '' }
        ],
        columnDefs: [
          {
            targets: -1,
            render: function ( data, type, row ) {
              return '<div class="btn-group btn-group-xs"><button type="button" class="btn btn-default btn-up"><span class="glyphicon glyphicon-arrow-up"></span></button><button type="button" class="btn btn-default btn-down"><span class="glyphicon glyphicon-arrow-down"></span></button><button type="button" class="btn btn-default btn-minus"><span class="glyphicon glyphicon-minus"></span></button></div>';
            }
          }
        ]
      });

      data = new Modeler(this, opts);
      data.render();
      $el.data('nxmodeler', data);
      
      // 添加右键菜单
      $el.contextmenu({
        delegate: ".nxmodeler-node",
        autoFocus: true,
        preventContextMenuForPopup: true,
        preventSelect: true,
        menu: [
          { title: "追加串行节点", cmd: "add_serial", uiIcon: "ui-icon-plus" },
          { title: "追加并行节点", cmd: "add_parallel", uiIcon: "ui-icon-plus" },
          { title: "----" },
          { title: "删除", cmd: "delete", uiIcon: "ui-icon-trash" }
        ],
        select: function (event, ui) {
          var $target = $(ui.target).hasClass('nxmodeler-node') ? $(ui.target) : $(ui.target).closest('.nxmodeler-node');
          var cur_node = $target.data('nxnode');
          console.debug(ui.cmd);
          switch (ui.cmd) {
            case "add_serial":
              $userpicker.find('.modal-title').text('追加串行节点');
              $userpicker.data('cur_node', cur_node).data('action', ui.cmd).modal('show');
              break;
            case "add_parallel":
              $userpicker.find('.modal-title').text('追加并行节点');
              $userpicker.data('cur_node', cur_node).data('action', ui.cmd).modal('show');
              break;
            case "delete":
              data.deleteNode(cur_node);
              data.render();
              break;
            default:
              $userpicker.find('.modal-title').text('选择参与者');
              break;
          }
        },
        beforeOpen: function(event, ui) {
          $el.contextmenu("enableEntry", "add_serial", true);
          $el.contextmenu("enableEntry", "add_parallel", true);
          $el.contextmenu("enableEntry", "delete", true);
          var $target = $(ui.target).hasClass('nxmodeler-node') ? $(ui.target) : $(ui.target).closest('.nxmodeler-node');
          var cur_node = $target.data('nxnode');

          // 判断是否可以删除节点
          if (cur_node.isCommiter || cur_node.type === 'ParallelGateway') {
            // 发起人和网关节点不能删除
            $el.contextmenu("enableEntry", "delete", false);
          }
        }
      });
      
      $userpicker.on('shown.bs.modal', function(e) {
        table.clear();
        table.rows.add(table_data);
        table.columns.adjust().draw(); // 初始化datatable时modal是隐藏的，会导致表头宽度不正确，这里重绘datatable

        select_table.clear();
        select_table.columns.adjust().draw(); // 初始化datatable时modal是隐藏的，会导致表头宽度不正确，这里重绘datatable
      });
      
      $('.nxmodeler-userpicker-table > tbody', $userpicker).on('click', '.btn-plus', function (e) {
        var _tr = $(this).closest('tr')[0];
        var row = table.row(_tr).data();
        var selected = select_table.rows().data();
        var exists = false;
        for (var i=0; i<selected.length; i++) {
          if (selected[i].ID === row.ID) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          selected.push(row);
          select_table.clear();
          select_table.rows.add(selected);
          select_table.columns.adjust().draw();
        }
      });
      
      $('.nxmodeler-userpicker-select > tbody', $userpicker).on('click', '.btn-minus', function (e) {
        var _tr = $(this).closest('tr')[0];
        var index = select_table.row(_tr).index();
        var selected = select_table.rows().data();
        if (index > -1) {
          selected.splice(index, 1);
          select_table.clear();
          select_table.rows.add(selected);
          select_table.columns.adjust().draw();
        }
      });
      
      $('.nxmodeler-userpicker-select > tbody', $userpicker).on('click', '.btn-up', function (e) {
        var _tr = $(this).closest('tr')[0];
        var index = select_table.row(_tr).index();
        var selected = select_table.rows().data();
        if (index > 0) {
          var row = selected.splice(index, 1)[0];
          selected.splice(index - 1, 0, row);
          select_table.clear();
          select_table.rows.add(selected);
          select_table.columns.adjust().draw();
        }
      });
      
      $('.nxmodeler-userpicker-select > tbody', $userpicker).on('click', '.btn-down', function (e) {
        var _tr = $(this).closest('tr')[0];
        var index = select_table.row(_tr).index();
        var selected = select_table.rows().data();
        if (index < selected.length - 1) {
          var row = selected.splice(index, 1)[0];
          selected.splice(index + 1, 0, row);
          select_table.clear();
          select_table.rows.add(selected);
          select_table.columns.adjust().draw();
        }
      });

      $userpicker.on('click', '.btn-primary', function(e) {
        if (select_table.rows().count() > 0) {
          var rows = select_table.rows().data();
          var action = $userpicker.data('action');
          var cur_node = $userpicker.data('cur_node');
          switch (action) {
            case 'add_serial':
              data.addSerialNodes(cur_node, rows.toArray().map(function(row){return {assignee: row.ID, name: row.DISPLAYNAME}}));
              data.render();
              break;
            case 'add_parallel':
              if (rows.length ===1) {
                // 追加并行但只选择一个节点时，当作串行处理
                data.addSerialNodes(cur_node, rows.toArray().map(function(row){return {assignee: row.ID, name: row.DISPLAYNAME}}));
              } else {
                data.addParallelNodes(cur_node, rows.toArray().map(function(row){return {assignee: row.ID, name: row.DISPLAYNAME}}));
              }
              data.render();
              break;
          }
          $userpicker.modal('hide');
        }
      });

      $(document).on('click', '.nxmodeler-btn-save', function(e) {
        $('.nxmodeler-userpicker-processname', $saveDialog).val(data.opt.modelName);
        $saveDialog.modal('show');
      });

      $saveDialog.on('click', '.btn-primary', function(e) {
        var processName = $('.nxmodeler-userpicker-processname', $saveDialog).val();
        if (processName === '') {
          $alert.find('.nxmodeler-alert-message').text('请填写流程名称！');
          $alert.modal('show');
          return;
        }

        for (var i in data.nodes) {
          var el = data.nodes[i];
          if (el.type === 'UserTask' && !el.assignee) {
            $alert.find('.nxmodeler-alert-message').text('所有节点必须指定处理人！');
            $alert.modal('show');
            return;
          }
        }

        var timestamp = new Date().getTime();
        data.name = processName;
        data.process_id = data.opt.commiter.name + '_' + timestamp;
        data.opt.onSave.apply(that, [processName, data.toJSON()]);
        $saveDialog.modal('hide');
      });

    });
    if (internal_return !== undefined)
      return internal_return;
    else
      return this;
  };

  $.fn.nxmodeler.defaults = defaults;

})(jQuery);