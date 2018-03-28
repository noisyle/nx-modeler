var model1 = {
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
        "assignee": "01",
        "name": "李亮",
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


var model2 = {
  "resourceId": "370005",
  "properties": {
    "process_id": "process001",
    "name": "001"
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
      ],
      "bounds": {
        "upperLeft": {
          "x": 0,
          "y": 100
        },
        "lowerRight": {
          "x": 38,
          "y": 138
        }
      }
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
      "dockers": [
        {
          "x": 38,
          "y": 119
        },
        {
          "x": 150,
          "y": 119
        }
      ]
    },
    {
      "resourceId": "sid-ECEB317C-385A-4163-A588-80BFBF5FF684",
      "properties": {
        "formkeydefinition": "mcDiyForm01",
        "isCommiter": true,
        "assignee": "001",
        "name": "张三"
      },
      "stencil": {
        "id": "UserTask"
      },
      "outgoing": [
        {
          "resourceId": "sid-856B6AB4-BD11-4FCA-B93D-C8D95497CEB7"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 150,
          "y": 100
        },
        "lowerRight": {
          "x": 188,
          "y": 138
        }
      }
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
        "resourceId": "sid-F6E807A3-2B03-48ED-8DC0-5BA6401E7768"
      },
      "target": {
        "resourceId": "sid-A213CE1C-9E77-4682-9DAC-9E86588F8532"
      },
      "dockers": [
        {
          "x": 488,
          "y": 19
        },
        {
          "x": 600,
          "y": 119
        }
      ]
    },
    {
      "resourceId": "sid-A213CE1C-9E77-4682-9DAC-9E86588F8532",
      "properties": {
        "name": ""
      },
      "stencil": {
        "id": "EndNoneEvent"
      },
      "bounds": {
        "upperLeft": {
          "x": 600,
          "y": 100
        },
        "lowerRight": {
          "x": 638,
          "y": 138
        }
      }
    },
    {
      "resourceId": "sid-0AB81B02-CC50-4254-BE57-67926D1BB537",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "assignee": 829431494967296,
        "name": "郭宏波"
      },
      "stencil": {
        "id": "UserTask"
      },
      "outgoing": [
        {
          "resourceId": "sid-418D9725-389C-489D-9D9D-D43C38EF7267"
        },
        {
          "resourceId": "sid-58FCBE34-47D2-4653-9F2D-EC03B25698F1"
        },
        {
          "resourceId": "sid-D50962EA-0541-4C11-BBF4-6E95F0F62580"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 300,
          "y": 100
        },
        "lowerRight": {
          "x": 338,
          "y": 138
        }
      }
    },
    {
      "resourceId": "sid-856B6AB4-BD11-4FCA-B93D-C8D95497CEB7",
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
        "resourceId": "sid-0AB81B02-CC50-4254-BE57-67926D1BB537"
      },
      "dockers": [
        {
          "x": 188,
          "y": 119
        },
        {
          "x": 300,
          "y": 119
        }
      ]
    },
    {
      "resourceId": "sid-F6E807A3-2B03-48ED-8DC0-5BA6401E7768",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "assignee": 1096,
        "name": "李强"
      },
      "stencil": {
        "id": "UserTask"
      },
      "outgoing": [
        {
          "resourceId": "sid-0988EA58-411B-46DF-836E-915131716B89"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 450,
          "y": 0
        },
        "lowerRight": {
          "x": 488,
          "y": 38
        }
      }
    },
    {
      "resourceId": "sid-418D9725-389C-489D-9D9D-D43C38EF7267",
      "properties": {
        "name": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-0AB81B02-CC50-4254-BE57-67926D1BB537"
      },
      "target": {
        "resourceId": "sid-F6E807A3-2B03-48ED-8DC0-5BA6401E7768"
      },
      "dockers": [
        {
          "x": 338,
          "y": 119
        },
        {
          "x": 450,
          "y": 19
        }
      ]
    },
    {
      "resourceId": "sid-5460B6E4-6414-4006-A476-B9B35B0571BE",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "assignee": 1069,
        "name": "李亮"
      },
      "stencil": {
        "id": "UserTask"
      },
      "outgoing": [
        {
          "resourceId": "sid-42980BB3-044E-4A87-91EE-D26AB383836A"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 450,
          "y": 100
        },
        "lowerRight": {
          "x": 488,
          "y": 138
        }
      }
    },
    {
      "resourceId": "sid-58FCBE34-47D2-4653-9F2D-EC03B25698F1",
      "properties": {
        "name": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-0AB81B02-CC50-4254-BE57-67926D1BB537"
      },
      "target": {
        "resourceId": "sid-5460B6E4-6414-4006-A476-B9B35B0571BE"
      },
      "dockers": [
        {
          "x": 338,
          "y": 119
        },
        {
          "x": 450,
          "y": 119
        }
      ]
    },
    {
      "resourceId": "sid-42980BB3-044E-4A87-91EE-D26AB383836A",
      "properties": {
        "name": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-5460B6E4-6414-4006-A476-B9B35B0571BE"
      },
      "target": {
        "resourceId": "sid-A213CE1C-9E77-4682-9DAC-9E86588F8532"
      },
      "dockers": [
        {
          "x": 488,
          "y": 119
        },
        {
          "x": 600,
          "y": 119
        }
      ]
    },
    {
      "resourceId": "sid-507F862B-F936-48F6-8A6B-A28806F7282E",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "assignee": 1071,
        "name": "冯宇鹏"
      },
      "stencil": {
        "id": "UserTask"
      },
      "outgoing": [
        {
          "resourceId": "sid-63C0A4E4-FB29-46D3-AC46-C3EECDA0BF03"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 450,
          "y": 200
        },
        "lowerRight": {
          "x": 488,
          "y": 238
        }
      }
    },
    {
      "resourceId": "sid-D50962EA-0541-4C11-BBF4-6E95F0F62580",
      "properties": {
        "name": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-0AB81B02-CC50-4254-BE57-67926D1BB537"
      },
      "target": {
        "resourceId": "sid-507F862B-F936-48F6-8A6B-A28806F7282E"
      },
      "dockers": [
        {
          "x": 338,
          "y": 119
        },
        {
          "x": 450,
          "y": 219
        }
      ]
    },
    {
      "resourceId": "sid-63C0A4E4-FB29-46D3-AC46-C3EECDA0BF03",
      "properties": {
        "name": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-507F862B-F936-48F6-8A6B-A28806F7282E"
      },
      "target": {
        "resourceId": "sid-A213CE1C-9E77-4682-9DAC-9E86588F8532"
      },
      "dockers": [
        {
          "x": 488,
          "y": 219
        },
        {
          "x": 600,
          "y": 119
        }
      ]
    }
  ],
  "bounds": {
    "lowerRight": {
      "x": 638,
      "y": 238
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



var model3 = {
  "resourceId": "2167501",
  "properties": {
    "process_id": "aaa",
    "name": "bbb",
    "documentation": "",
    "process_author": "",
    "process_version": "",
    "process_namespace": "http://www.activiti.org/processdef",
    "executionlisteners": "",
    "eventlisteners": "",
    "signaldefinitions": "",
    "messagedefinitions": ""
  },
  "stencil": {
    "id": "BPMNDiagram"
  },
  "childShapes": [
    {
      "resourceId": "sid-1C4EAF47-D157-4A2C-B926-B9B9BFE57410",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "executionlisteners": "",
        "initiator": "",
        "formkeydefinition": "",
        "formproperties": ""
      },
      "stencil": {
        "id": "StartNoneEvent"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-6D8B9423-9B49-45C9-9B71-57C59AEE655E"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 112.5,
          "y": 204
        },
        "upperLeft": {
          "x": 82.5,
          "y": 174
        }
      },
      "dockers": []
    },
    {
      "resourceId": "sid-294C267C-528D-4A37-B4D7-835328C458CB",
      "properties": {
        "overrideid": "",
        "name": "发起人",
        "documentation": "",
        "asynchronousdefinition": "false",
        "exclusivedefinition": "false",
        "executionlisteners": "",
        "multiinstance_type": "None",
        "multiinstance_cardinality": "",
        "multiinstance_collection": "",
        "multiinstance_variable": "",
        "multiinstance_condition": "",
        "isforcompensation": "false",
        "usertaskassignment": "",
        "formkeydefinition": "",
        "duedatedefinition": "",
        "prioritydefinition": "",
        "formproperties": "",
        "tasklisteners": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-1DDD1074-8980-489F-9CB5-9CE35B6C55F6"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 257.5,
          "y": 229
        },
        "upperLeft": {
          "x": 157.5,
          "y": 149
        }
      },
      "dockers": []
    },
    {
      "resourceId": "sid-6D8B9423-9B49-45C9-9B71-57C59AEE655E",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "conditionsequenceflow": "",
        "executionlisteners": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-294C267C-528D-4A37-B4D7-835328C458CB"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 156.65625,
          "y": 189
        },
        "upperLeft": {
          "x": 113.109375,
          "y": 189
        }
      },
      "dockers": [
        {
          "x": 15,
          "y": 15
        },
        {
          "x": 50,
          "y": 40
        }
      ],
      "target": {
        "resourceId": "sid-294C267C-528D-4A37-B4D7-835328C458CB"
      }
    },
    {
      "resourceId": "sid-CE830680-B8FE-4E3A-8B6E-0960E3C4C212",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "sequencefloworder": ""
      },
      "stencil": {
        "id": "ParallelGateway"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-D57D9C0C-67EE-4121-9A0F-A15418F010EA"
        },
        {
          "resourceId": "sid-467458E8-5C90-4A8B-99DE-D634457F61B6"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 370,
          "y": 209
        },
        "upperLeft": {
          "x": 330,
          "y": 169
        }
      },
      "dockers": []
    },
    {
      "resourceId": "sid-1DDD1074-8980-489F-9CB5-9CE35B6C55F6",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "conditionsequenceflow": "",
        "executionlisteners": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-CE830680-B8FE-4E3A-8B6E-0960E3C4C212"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 330.07421875,
          "y": 189
        },
        "upperLeft": {
          "x": 258.041015625,
          "y": 189
        }
      },
      "dockers": [
        {
          "x": 50,
          "y": 40
        },
        {
          "x": 20,
          "y": 20
        }
      ],
      "target": {
        "resourceId": "sid-CE830680-B8FE-4E3A-8B6E-0960E3C4C212"
      }
    },
    {
      "resourceId": "sid-530C043A-99C7-4074-BCB3-144D1FE68573",
      "properties": {
        "overrideid": "",
        "name": "并行1",
        "documentation": "",
        "asynchronousdefinition": "false",
        "exclusivedefinition": "false",
        "executionlisteners": "",
        "multiinstance_type": "None",
        "multiinstance_cardinality": "",
        "multiinstance_collection": "",
        "multiinstance_variable": "",
        "multiinstance_condition": "",
        "isforcompensation": "false",
        "usertaskassignment": "",
        "formkeydefinition": "",
        "duedatedefinition": "",
        "prioritydefinition": "",
        "formproperties": "",
        "tasklisteners": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-80B4A13B-8F5D-4828-943E-D32FA2F2D13A"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 520,
          "y": 110
        },
        "upperLeft": {
          "x": 420,
          "y": 30
        }
      },
      "dockers": []
    },
    {
      "resourceId": "sid-D57D9C0C-67EE-4121-9A0F-A15418F010EA",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "conditionsequenceflow": "",
        "executionlisteners": "",
        "defaultflow": "false",
        "showdiamondmarker": false
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-530C043A-99C7-4074-BCB3-144D1FE68573"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 419.51953125,
          "y": 168.89453125
        },
        "upperLeft": {
          "x": 350.5,
          "y": 70
        }
      },
      "dockers": [
        {
          "x": 20.5,
          "y": 20.5
        },
        {
          "x": 350.5,
          "y": 70
        },
        {
          "x": 50,
          "y": 40
        }
      ],
      "target": {
        "resourceId": "sid-530C043A-99C7-4074-BCB3-144D1FE68573"
      }
    },
    {
      "resourceId": "sid-C4823154-F6BF-49AC-A300-A0658582BCC9",
      "properties": {
        "overrideid": "",
        "name": "并行2",
        "documentation": "",
        "asynchronousdefinition": "false",
        "exclusivedefinition": "false",
        "executionlisteners": "",
        "multiinstance_type": "None",
        "multiinstance_cardinality": "",
        "multiinstance_collection": "",
        "multiinstance_variable": "",
        "multiinstance_condition": "",
        "isforcompensation": "false",
        "usertaskassignment": "",
        "formkeydefinition": "",
        "duedatedefinition": "",
        "prioritydefinition": "",
        "formproperties": "",
        "tasklisteners": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-F658E7BF-95AF-43E3-A493-9C012B01CBD0"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 520,
          "y": 350
        },
        "upperLeft": {
          "x": 420,
          "y": 270
        }
      },
      "dockers": []
    },
    {
      "resourceId": "sid-467458E8-5C90-4A8B-99DE-D634457F61B6",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "conditionsequenceflow": "",
        "executionlisteners": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-C4823154-F6BF-49AC-A300-A0658582BCC9"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 419.51953125,
          "y": 310
        },
        "upperLeft": {
          "x": 350.5,
          "y": 209.328125
        }
      },
      "dockers": [
        {
          "x": 20.5,
          "y": 20.5
        },
        {
          "x": 350.5,
          "y": 310
        },
        {
          "x": 50,
          "y": 40
        }
      ],
      "target": {
        "resourceId": "sid-C4823154-F6BF-49AC-A300-A0658582BCC9"
      }
    },
    {
      "resourceId": "sid-A31B5F92-A262-4540-86E3-2152379A2486",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "sequencefloworder": ""
      },
      "stencil": {
        "id": "ParallelGateway"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-FDE94751-3178-46CF-AEAD-B7555984025A"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 595,
          "y": 209
        },
        "upperLeft": {
          "x": 555,
          "y": 169
        }
      },
      "dockers": []
    },
    {
      "resourceId": "sid-F658E7BF-95AF-43E3-A493-9C012B01CBD0",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "conditionsequenceflow": "",
        "executionlisteners": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-A31B5F92-A262-4540-86E3-2152379A2486"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 575,
          "y": 310
        },
        "upperLeft": {
          "x": 520.21875,
          "y": 208.90625
        }
      },
      "dockers": [
        {
          "x": 50,
          "y": 40
        },
        {
          "x": 575,
          "y": 310
        },
        {
          "x": 20,
          "y": 20
        }
      ],
      "target": {
        "resourceId": "sid-A31B5F92-A262-4540-86E3-2152379A2486"
      }
    },
    {
      "resourceId": "sid-7E3543E3-C988-4A28-AB24-D2396369573E",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "executionlisteners": ""
      },
      "stencil": {
        "id": "EndNoneEvent"
      },
      "childShapes": [],
      "outgoing": [],
      "bounds": {
        "lowerRight": {
          "x": 698,
          "y": 203
        },
        "upperLeft": {
          "x": 670,
          "y": 175
        }
      },
      "dockers": []
    },
    {
      "resourceId": "sid-FDE94751-3178-46CF-AEAD-B7555984025A",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "conditionsequenceflow": "",
        "executionlisteners": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-7E3543E3-C988-4A28-AB24-D2396369573E"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 669.437510618022,
          "y": 189.4094542540001
        },
        "upperLeft": {
          "x": 595.148426881978,
          "y": 189.0671082459999
        }
      },
      "dockers": [
        {
          "x": 20.5,
          "y": 20.5
        },
        {
          "x": 14,
          "y": 14
        }
      ],
      "target": {
        "resourceId": "sid-7E3543E3-C988-4A28-AB24-D2396369573E"
      }
    },
    {
      "resourceId": "sid-80B4A13B-8F5D-4828-943E-D32FA2F2D13A",
      "properties": {
        "overrideid": "",
        "name": "",
        "documentation": "",
        "conditionsequenceflow": "",
        "executionlisteners": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "childShapes": [],
      "outgoing": [
        {
          "resourceId": "sid-A31B5F92-A262-4540-86E3-2152379A2486"
        }
      ],
      "bounds": {
        "lowerRight": {
          "x": 575,
          "y": 169.40625
        },
        "upperLeft": {
          "x": 520.21875,
          "y": 70
        }
      },
      "dockers": [
        {
          "x": 50,
          "y": 40
        },
        {
          "x": 575,
          "y": 70
        },
        {
          "x": 20,
          "y": 20
        }
      ],
      "target": {
        "resourceId": "sid-A31B5F92-A262-4540-86E3-2152379A2486"
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