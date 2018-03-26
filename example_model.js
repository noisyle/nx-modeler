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