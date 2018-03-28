(function ($, undefined) {

  function Flowchart(el, opts) {
    this.el = el;
    this.opts = opts;
    this.shapeIdMap = {};
    this.startNode;
    var that = this;

    if (!opts.model ) {
      opts.model = opts.createModel();
      var commitNode = opts.model.childShapes.filter(function(el){return el.stencil.id === 'UserTask' && el.properties.isCommiter})[0];
      commitNode.properties.assignee = opts.commiter.assignee;
      commitNode.properties.name = opts.commiter.name;
    }

    opts.model.childShapes.forEach(function(el, i){
      if (el.stencil.id === 'StartNoneEvent') {
        that.startNode = el;
      }
      that.shapeIdMap[el.resourceId] = el;
    });
  }

  Flowchart.prototype = {
    constructor: Flowchart,
    _addNodes: function () {
      var config = this.opts.config;
      var shapes = this.opts.model.childShapes;
      var that = this;
      var $container = $(this.el);

      // 定位
      var col_no = 0;
      var col_array = [[this.startNode]];
      var node_solved = {};
      var col_no_map = {};
      // 定位x坐标
      while (col_array.length > 0) {
        var cur_col = col_array.shift();
        var next_col = [];
        cur_col.forEach(function(node, i){
          if (!node_solved[node.resourceId] || node_solved[node.resourceId].bounds.upperLeft.x < config.distance.x * col_no) {
            node.bounds = {
              "upperLeft": {
                "x": config.distance.x * col_no,
                "y": config.distance.y * i
              },
              "lowerRight": {
                "x": config.distance.x * col_no + config.node.w,
                "y": config.distance.y * i + config.node.h
              }
            };
  
            if (node.outgoing) {
              node.outgoing.forEach(function(out){
                next_col.push(that.shapeIdMap[that.shapeIdMap[out.resourceId].target.resourceId]);
              });
            }
            node_solved[node.resourceId] = node;
            col_no_map[node.resourceId] = col_no;
          }
        });

        if (next_col.length >0) {
          col_array.push(next_col);
        }
        col_no += 1;
      }
      //定位y坐标
      var col_no_reverse_map = {};
      Object.keys(col_no_map).forEach(function(resourceId){
        var col_no = col_no_map[resourceId];
        var node = that.shapeIdMap[resourceId];
        if (col_no_reverse_map[col_no]) {
          col_no_reverse_map[col_no].push(node);
        } else {
          col_no_reverse_map[col_no] = [node];
        }
      });
      var offset_y = 0;
      Object.keys(col_no_reverse_map).forEach(function(col_no){
        var col = col_no_reverse_map[col_no];
        col.forEach(function(node, i){
          node.bounds.upperLeft.y = config.distance.y * i - config.distance.y * (col.length - 1) / 2;
          node.bounds.lowerRight.y = node.bounds.upperLeft.y + config.node.h;

          // 以最小的y值作为y轴偏移
          if (node.bounds.upperLeft.y < offset_y) {
            offset_y = node.bounds.upperLeft.y;
          }
        });
      });

      //应用y轴偏移，查找最大的xy值
      var max_x = 0, max_y = 0;
      shapes.filter(function(node){return node.stencil.id !== 'SequenceFlow'}).forEach(function(node){
        node.bounds.upperLeft.y -= offset_y;
        node.bounds.lowerRight.y -= offset_y;

        if (node.bounds.lowerRight.x > max_x) {
          max_x = node.bounds.lowerRight.x;
        }
        if (node.bounds.lowerRight.y > max_y) {
          max_y = node.bounds.lowerRight.y;
        }
      });
      this.opts.model.bounds.lowerRight = {x: max_x, y: max_y};

      // 计算连线的docker坐标
      shapes.filter(function(el){return el.stencil.id === 'SequenceFlow'}).forEach(function(line){
        var source = that.shapeIdMap[line.source.resourceId];
        line.dockers[0] = {x: source.bounds.upperLeft.x + config.node.w, y: source.bounds.upperLeft.y + config.node.h / 2};
        var target = that.shapeIdMap[line.target.resourceId];
        line.dockers[1] = {x: target.bounds.upperLeft.x, y: target.bounds.upperLeft.y + config.node.h / 2};
      });

      // 生成节点html
      shapes.filter(function(node){return node.stencil.id !== 'SequenceFlow'}).forEach(function(node){
        if (!$("#"+config.prefix+node.resourceId).length) {
          var icon_class = 'ui-icon-person';
          var node_class = 'nxmodeler-usertask';
          if(node.stencil.id !== 'UserTask'){
            icon_class = 'ui-icon-radio-off';
            node_class = 'nxmodeler-eventnode';
          }
          var $node = $('<div id="'+config.prefix+node.resourceId+'"></div>');
          $node.append($('<span class="ui-icon '+icon_class+'"></span>'));
          if(node.stencil.id === 'UserTask'){
            $node.append($('<span class="nxmodeler-usertask-label">'+(node.properties.name?node.properties.name:'')+'</span>'));
          }
          $node.addClass(node_class).css({ 'left': node.bounds.upperLeft.x+'px', 'top': node.bounds.upperLeft.y+'px' });
          $node.data('nxnode', node)
          $container.append($node);
        }
      });

      $container.css({ 'width': max_x+40+'px', 'height': max_y+40+'px' }); // label的height

      // 添加右键菜单
      $container.contextmenu({
        delegate: ".nxmodeler-usertask",
        autoFocus: true,
        preventContextMenuForPopup: true,
        preventSelect: true,
        menu: [
          { title: "添加串行节点", cmd: "add_approve", uiIcon: "ui-icon-plus" },
          { title: "添加会签节点", cmd: "add_vote", uiIcon: "ui-icon-plus" },
          { title: "----" },
          { title: "删除", cmd: "delete", uiIcon: "ui-icon-trash" }
        ],
        select: function (event, ui) {
          var $target = $(ui.target).hasClass('nxmodeler-usertask') ? $(ui.target) : $(ui.target).closest('.nxmodeler-usertask');
          var cur_node = $target.data('nxnode');
          switch (ui.cmd) {
            case "add_approve":
              console.log("添加串行节点, 当前节点: %O", cur_node);
              var new_node = {
                "resourceId": that._helper.uuid(),
                "properties": {
                  "formkeydefinition": "mcDiyForm02",
                  "name": ""
                },
                "stencil": {
                  "id": "UserTask"
                },
                "outgoing": []
              };
              shapes.push(new_node);
              that.shapeIdMap[new_node.resourceId] = new_node;

              var new_line = {
                "resourceId": that._helper.uuid(),
                "properties": {
                  "name": "",
                  "defaultflow": "false"
                },
                "stencil": {
                  "id": "SequenceFlow"
                },
                "source": {
                  "resourceId": cur_node.resourceId
                },
                "target": {
                  "resourceId": new_node.resourceId
                },
                "dockers": []
              };
              shapes.push(new_line);
              that.shapeIdMap[new_line.resourceId] = new_line;

              cur_node.outgoing.forEach(function(out){
                that.shapeIdMap[out.resourceId].source.resourceId = new_node.resourceId;
                new_node.outgoing.push({"resourceId": out.resourceId});
              });
              cur_node.outgoing = [{"resourceId": new_line.resourceId}];

              that.render();
              break
            case "add_vote":
              console.log("添加会签节点, 当前节点: %O", cur_node);
              // 创建新节点
              var new_node = {
                "resourceId": that._helper.uuid(),
                "properties": {
                  "formkeydefinition": "mcDiyForm02",
                  "name": ""
                },
                "stencil": {
                  "id": "UserTask"
                },
                "outgoing": []
              };
              shapes.push(new_node);
              that.shapeIdMap[new_node.resourceId] = new_node;

              var cur_line_in = shapes.filter(function(el){return el.stencil.id === 'SequenceFlow' && el.target.resourceId === cur_node.resourceId})[0];
              var new_line_in = {
                "resourceId": that._helper.uuid(),
                "properties": {
                  "name": "",
                  "defaultflow": "false"
                },
                "stencil": {
                  "id": "SequenceFlow"
                },
                "source": {
                  "resourceId": cur_line_in.source.resourceId
                },
                "target": {
                  "resourceId": new_node.resourceId
                },
                "dockers": []
              };
              shapes.push(new_line_in);
              that.shapeIdMap[new_line_in.resourceId] = new_line_in;
              // 为前一节点添加到新节点的outgoing
              that.shapeIdMap[cur_line_in.source.resourceId].outgoing.push({"resourceId": new_line_in.resourceId});

              var cur_line_out = that.shapeIdMap[cur_node.outgoing[0].resourceId];
              var new_line_out = {
                "resourceId": that._helper.uuid(),
                "properties": {
                  "name": "",
                  "defaultflow": "false"
                },
                "stencil": {
                  "id": "SequenceFlow"
                },
                "source": {
                  "resourceId": new_node.resourceId
                },
                "target": {
                  "resourceId": cur_line_out.target.resourceId
                },
                "dockers": []
              };
              shapes.push(new_line_out);
              that.shapeIdMap[new_line_out.resourceId] = new_line_out;
              // 为新节点添加到下一节点的outgoing
              new_node.outgoing.push({"resourceId": new_line_out.resourceId});
              
              that.render();
              break
            case "delete":
              console.log("删除节点, 当前节点: %O", cur_node);
              
              // 获取当前节点前后的节点
              var prev_nodes = shapes.filter(function(line){return line.stencil.id === 'SequenceFlow' && line.target.resourceId === cur_node.resourceId}).map(function(line){return that.shapeIdMap[line.source.resourceId]});
              var next_nodes = shapes.filter(function(line){return line.stencil.id === 'SequenceFlow' && line.source.resourceId === cur_node.resourceId}).map(function(line){return that.shapeIdMap[line.target.resourceId]});
              var inVote = prev_nodes.filter(function(node){return node.outgoing.length > 1}).length > 0; // 简单处理，根据前一节点outgoing数量判断是否在分支中
              
              // 删除进入和离开当前节点的线
              var lines = shapes.filter(function(line){return line.stencil.id === 'SequenceFlow' && (line.source.resourceId === cur_node.resourceId || line.target.resourceId === cur_node.resourceId)});
              lines.forEach(function(line){
                var index = -1;
                for (var i=0; i<shapes.length; i++) {
                  var shape = shapes[i];
                  if (shape.resourceId === line.resourceId) {
                    index = i;
                    break; 
                  }
                }
                if (index > -1) {
                  shapes.splice(index, 1);
                }

                // 删除前一个节点到当前节点的outgoing
                if (line.target.resourceId === cur_node.resourceId) {
                  var prev = that.shapeIdMap[line.source.resourceId];
                  for (var i=0; i<prev.outgoing.length; i++) {
                    var out = prev.outgoing[i];
                    if (out.resourceId === line.resourceId) {
                      prev.outgoing.splice(i, 1);
                      break; 
                    }
                  }
                }

                delete that.shapeIdMap[line.resourceId];
              });

              // 删除当前节点
              for (var i=0; i<shapes.length; i++) {
                var shape = shapes[i];
                if (shape.resourceId === cur_node.resourceId) {
                  shapes.splice(i, 1);
                  break; 
                }
              }
              delete that.shapeIdMap[cur_node.resourceId];

              // 连接当前节点前后的节点
              if (!inVote) {
                prev_nodes.forEach(function(prev){
                  next_nodes.forEach(function(next){
                    var new_line = {
                      "resourceId": that._helper.uuid(),
                      "properties": {
                        "name": "",
                        "defaultflow": "false"
                      },
                      "stencil": {
                        "id": "SequenceFlow"
                      },
                      "source": {
                        "resourceId": prev.resourceId
                      },
                      "target": {
                        "resourceId": next.resourceId
                      },
                      "dockers": []
                    };
                    shapes.push(new_line);
                    that.shapeIdMap[new_line.resourceId] = new_line;
                    prev.outgoing.push({"resourceId": new_line.resourceId});
                  });
                });
              }

              that.render();
              break
          }
        },
        beforeOpen: function(event, ui) {
          $container.contextmenu("enableEntry", "add_approve", true);
          $container.contextmenu("enableEntry", "add_vote", true);
          $container.contextmenu("enableEntry", "delete", true);
          var $target = $(ui.target).hasClass('nxmodeler-usertask') ? $(ui.target) : $(ui.target).closest('.nxmodeler-usertask');
          var cur_node = $target.data('nxnode');

          // 判断是否可以添加串行节点
          var next_node_id = that.shapeIdMap[cur_node.outgoing[0].resourceId].target.resourceId;
          var next_lines_in = shapes.filter(function(el){return el.stencil.id === 'SequenceFlow' && el.target.resourceId === next_node_id});
          if (next_lines_in.length > 1) {
            $container.contextmenu("enableEntry", "add_approve", false);
          }

          // 判断是否可以添加会签节点
          var cur_lines_in = shapes.filter(function(el){return el.stencil.id === 'SequenceFlow' && el.target.resourceId === cur_node.resourceId});
          if (cur_lines_in.length > 1 || cur_node.outgoing.length > 1) {
            $container.contextmenu("enableEntry", "add_vote", false);
          } else if (cur_lines_in.length == 1) {
            var prev_node = that.shapeIdMap[cur_lines_in[0].source.resourceId];
            if (prev_node.stencil.id === 'StartNoneEvent') {
              $container.contextmenu("enableEntry", "add_vote", false);
            }
          }

          // 判断是否可以删除节点
          var prev_node = that.shapeIdMap[cur_lines_in[0].source.resourceId];
          if (prev_node.stencil.id === 'StartNoneEvent') {
            // 发起人节点不能删除
            $container.contextmenu("enableEntry", "delete", false);
          }
          if (cur_lines_in.length > 1 && cur_node.outgoing.length > 1) {
            // 两个分支聚合之间的主干不能删除
            $container.contextmenu("enableEntry", "delete", false);
          }
        },
      });
    },
    _addEndpoints: function () {
      var config = this.opts.config;
      var instance = this.instance;

      this.opts.model.childShapes.filter(function(el){return el.stencil.id !== 'SequenceFlow'}).forEach(function(el){
        if(el.stencil.id !== 'EndNoneEvent'){
          // 画出点
          instance.addEndpoint(config.prefix+el.resourceId, config.sourceEndpoint, {
            anchor: 'RightMiddle',
            uuid: el.resourceId+'-RightMiddle'
          });
        }
        if(el.stencil.id !== 'StartNoneEvent'){
          // 画入点
          instance.addEndpoint(config.prefix+el.resourceId, config.targetEndpoint, {
            anchor: 'LeftMiddle',
            uuid: el.resourceId+'-LeftMiddle'
          });
        }
      });
    },
    _connect: function () {
      var config = this.opts.config;
      var instance = this.instance;

      this.opts.model.childShapes.filter(function(el){return el.stencil.id === 'SequenceFlow'}).forEach(function(el){
        var connection = instance.connect({
          uuids: [el.source.resourceId+'-RightMiddle', el.target.resourceId+'-LeftMiddle'],
          editable: config.editable,
        });
        // if (connection) {
        //   connection.getOverlay('label').setLabel(el.label);
        // }
        
      });
    },
    _helper: {
      uuid: function (len, radix) {
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
      $(this.el).html("");
    },
    render: function () {
      this._destroy();
      this._init();
      this._addNodes();
      this._addEndpoints();
      this._connect();
    },
    export: function () {
      return this.opts.model;
    }
  }

  var defaults = {
    modelName: '',
    model: undefined,
    config: {
      prefix: 'nx_',//对应html里节点的ID前缀
      distance: {x: 200, y: 100},//对应html里节点之间的间隔
      node: {w: 60, h: 60},//对应html里节点的宽度和高度
      elementName: 'node',
      editable: false,
      sourceEndpoint: {
        endpoint: "Dot",
        paintStyle: {
          //stroke: "#7AB02C",
          fill: "transparent",
          radius: 7,
          strokeWidth: 1
        },
        isSource: true,
        connector: ["Flowchart", {
          stub: [40, 60],
          //gap: 10,
          cornerRadius: 5,//连线的弯曲度
          alwaysRespectStubs: true
        }],//流程图的线
        connectorStyle: {
          strokeWidth: 2,
          stroke: "#61B7CF",
          joinstyle: "round",
          outlineStroke: "white",
          outlineWidth: 2
        },
        connectorHoverStyle: {
          strokeWidth: 3,
          stroke: "#216477",
          outlineWidth: 2,
          outlineStroke: "white"
        },
        maxConnections: 999,
      },
      targetEndpoint: {
        endpoint: "Dot",
        paintStyle: {
          //fill: "#7AB02C",
          radius: 7
        },
        maxConnections: 999,
        isTarget: true,
      }
    },
    onSave: function(modelName, model){
      console.log('modelName: ' + modelName);
      console.log(JSON.stringify(model, null, 2));
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
    '        <h4 class="modal-title">选择参与者</h4>'+
    '      </div>'+
    '      <div class="modal-body">'+
    '        <div class="row">'+
    '          <div class="col-md-4">'+
    '            <ul class="ztree nxmodeler-userpicker-tree"></ul>'+
    '          </div>'+
    '          <div class="col-md-8 nxmodeler-userpicker-right">'+
    '            <table class="table table-striped table-bordered table-hover nowrap nxmodeler-userpicker-table" cellspacing="0" width="100%">'+
    '              <thead>'+
    '                <tr>'+
    '                    <th>姓名</th>'+
    '                    <th>登录名</th>'+
    '                    <th>部门</th>'+
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
    },
    createModel: function () {
      return {
        "resourceId": "",
        "properties": {
          "process_id": "",
          "name": ""
        },
        "stencil": {
          "id": "BPMNDiagram"
        },
        "childShapes": [
          {
            "resourceId": "sid-14BCF2EA-EF5F-40C7-9FB7-86BD797B9175",
            "properties": {
              "name": ""
            },
            "stencil": {
              "id": "StartNoneEvent"
            },
            "outgoing": [
              {
                "resourceId": "sid-1594FAE6-46B3-440C-A8A0-9BC924F54F83"
              }
            ]
          },
          {
            "resourceId": "sid-1594FAE6-46B3-440C-A8A0-9BC924F54F83",
            "properties": {
              "name": "",
              "defaultflow": "false"
            },
            "stencil": {
              "id": "SequenceFlow"
            },
            "source": {
              "resourceId": "sid-14BCF2EA-EF5F-40C7-9FB7-86BD797B9175"
            },
            "target": {
              "resourceId": "sid-ECEB317C-385A-4163-A588-80BFBF5FF684"
            },
            "dockers": []
          },
          {
            "resourceId": "sid-ECEB317C-385A-4163-A588-80BFBF5FF684",
            "properties": {
              "formkeydefinition": "mcDiyForm01",
              "isCommiter": true
            },
            "stencil": {
              "id": "UserTask"
            },
            "outgoing": [
              {
                "resourceId": "sid-0988EA58-411B-46DF-836E-915131716B89"
              }
            ]
          },
          {
            "resourceId": "sid-0988EA58-411B-46DF-836E-915131716B89",
            "properties": {
              "name": "",
              "defaultflow": "false"
            },
            "stencil": {
              "id": "SequenceFlow"
            },
            "source": {
              "resourceId": "sid-ECEB317C-385A-4163-A588-80BFBF5FF684"
            },
            "target": {
              "resourceId": "sid-A213CE1C-9E77-4682-9DAC-9E86588F8532"
            },
            "dockers": []
          },
          {
            "resourceId": "sid-A213CE1C-9E77-4682-9DAC-9E86588F8532",
            "properties": {
              "name": ""
            },
            "stencil": {
              "id": "EndNoneEvent"
            }
          }
        ],
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
    }
  };

  $.fn.nxmodeler = function (option) {
    var args = Array.apply(null, arguments);
    args.shift();
    var internal_return;
    this.each(function () {
      var that = this;
      var $this = $(this),
        data = $this.data('nxmodeler'),
        options = typeof option === 'object' && option;
      if (!data) {
        var opts = $.extend({}, defaults, options);

        var $wrap = $(opts.container_template);
        $wrap.insertBefore($this);
        $wrap.find('.nxmodeler-wrap').append($this);

        var $userpicker = $('.nxmodeler-userpicker');
        var $saveDialog = $('.nxmodeler-save-dialog');
        var $alert = $('.nxmodeler-alert');

        var zTreeObj, table;
        if (!$userpicker.length) {
          $userpicker = $(opts.userpicker_template);
          $wrap.append($userpicker);
          $saveDialog = $(opts.save_dialog_template);
          $wrap.append($saveDialog);
          $alert = $(opts.alert_template);
          $wrap.append($alert);

          // mock部门树
          var ztree_settings = {
            data: {
              simpleData: {
                enable: true
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
          table = $('.nxmodeler-userpicker-table').DataTable({
            language: {url: "lib/DataTables-Bootstrap3/1.10.16/i18n/Chinese.json"},
            select: {
              style: 'single'
            },
            paging: false,
            // searching: false,
            scrollY: 350,
            scrollCollapse: true,
            columns: [
            	{ data: 'DISPLAYNAME' },
              { data: 'USERNAME' },
              { data: 'PARTYNAME' }
            ]
          });
        } else {
          // TODO 一个页面上有两个modeler才考虑此情况
        }

        data = new Flowchart(this, opts);
        data.render();
        $this.data('nxmodeler', data).addClass('nxmodeler-canvas');

        $this.on('click', '.nxmodeler-usertask', function(e){
          var $target = $(e.target).hasClass('nxmodeler-usertask') ? $(e.target) : $(e.target).closest('.nxmodeler-usertask');
          var cur_node = $target.data('nxnode');
          if (!cur_node.properties.isCommiter) {
            table.clear();
            table.rows.add([
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
              {DISPLAYNAME: "马辰", USERNAME: "machen", ID: 1070, PARTYNAME: "信息部-java开发组"},
            ]);
            table.draw();
            $userpicker.data('cur_node', cur_node).modal('show');
          }
        });

        $(document).on('click', '.nxmodeler-btn-save', function(e) {
          $('.nxmodeler-userpicker-processname', $saveDialog).val(data.opts.modelName);
          $saveDialog.modal('show');
        });

        $saveDialog.on('click', '.btn-primary', function(e) {
          var processName = $('.nxmodeler-userpicker-processname', $saveDialog).val();
          if (processName === '') {
            $alert.find('.nxmodeler-alert-message').text('请填写流程名称！');
            $alert.modal('show');
            return;
          }

          for (var i in data.opts.model.childShapes) {
            var el = data.opts.model.childShapes[i];
            if (el.stencil.id === 'UserTask' && !el.properties.assignee) {
              $alert.find('.nxmodeler-alert-message').text('所有节点必须指定处理人！');
              $alert.modal('show');
              return;
            }
          }

          var timestamp = new Date().getTime();
          data.opts.modelName = processName;
          data.opts.model.properties.name = data.opts.commiter.name + '_' + processName + '_' + timestamp;
          data.opts.model.properties.process_id = data.opts.commiter.name + timestamp;
          data.opts.onSave.apply(that, [processName, data.opts.model]);
          $saveDialog.modal('hide');
        });
        
        var userSelected = function(user) {
            var node = $userpicker.data('cur_node');
            node.properties.name = user.DISPLAYNAME;
            node.properties.assignee = user.ID.toString();
            data.render();
        };

        $userpicker.on('click', '.btn-primary', function(e) {
          if (table.rows( { selected: true } ).count() > 0) {
            var row = table.row( { selected: true } ).data();
            userSelected(row);
            $userpicker.modal('hide');
          }
        });
        
        $('tbody', $userpicker).on('dblclick', 'tr', function (e) {
        	var row = table.row(this).data();
          userSelected(row);
          $userpicker.modal('hide');
        })

        $userpicker.on('shown.bs.modal', function(e) {
          table.columns.adjust().draw(); // 初始化datatable时modal是隐藏的，会导致表头宽度不正确，这里重绘datatable
        });

      }
      if (typeof option === 'string' && typeof data[option] === 'function') {
        internal_return = data[option].apply(data, args);
        if (internal_return !== undefined)
          return false;
      }
    });
    if (internal_return !== undefined)
      return internal_return;
    else
      return this;
  };

  $.fn.nxmodeler.defaults = defaults;

})(jQuery);