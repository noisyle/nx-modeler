var model1 = {
  "resourceId": "",
  "properties": {
    "process_id": "张三_1534745376211",
    "name": "a"
  },
  "stencil": {
    "id": "BPMNDiagram"
  },
  "childShapes": [
    {
      "resourceId": "sid-4F949E9C-3200-406C-869A-D38811B87EB0",
      "properties": {
        "formkeydefinition": "",
        "isCommiter": false,
        "assignee": "",
        "name": "开始",
        "gatewayType": ""
      },
      "stencil": {
        "id": "StartNoneEvent"
      },
      "incoming": [],
      "outgoing": [
        {
          "resourceId": "sid-80D17F66-E6E5-4BD6-8B50-8E22A0E47D1B"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 40,
          "y": 40
        },
        "lowerRight": {
          "x": 96,
          "y": 96
        }
      }
    },
    {
      "resourceId": "sid-C5E4F172-1F78-4A23-BD04-93C87F880C0B",
      "properties": {
        "formkeydefinition": "mcDiyForm01",
        "isCommiter": true,
        "assignee": "0001",
        "name": "张三",
        "gatewayType": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "incoming": [
        {
          "resourceId": "sid-80D17F66-E6E5-4BD6-8B50-8E22A0E47D1B"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-3E248C40-758F-4444-854B-D83B16E05026"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 160,
          "y": 40
        },
        "lowerRight": {
          "x": 216,
          "y": 96
        }
      }
    },
    {
      "resourceId": "sid-DFAA8AA4-E8A6-4219-A02C-9D387CD729E9",
      "properties": {
        "formkeydefinition": "",
        "isCommiter": false,
        "assignee": "",
        "name": "结束",
        "gatewayType": ""
      },
      "stencil": {
        "id": "EndNoneEvent"
      },
      "incoming": [
        {
          "resourceId": "sid-3E248C40-758F-4444-854B-D83B16E05026"
        }
      ],
      "outgoing": [],
      "bounds": {
        "upperLeft": {
          "x": 280,
          "y": 40
        },
        "lowerRight": {
          "x": 336,
          "y": 96
        }
      }
    },
    {
      "resourceId": "sid-80D17F66-E6E5-4BD6-8B50-8E22A0E47D1B",
      "properties": {
        "name": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-4F949E9C-3200-406C-869A-D38811B87EB0"
      },
      "target": {
        "resourceId": "sid-C5E4F172-1F78-4A23-BD04-93C87F880C0B"
      },
      "outgoing": [
        {
          "resourceId": "sid-C5E4F172-1F78-4A23-BD04-93C87F880C0B"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 40,
          "y": 40
        },
        "lowerRight": {
          "x": 160,
          "y": 40
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-3E248C40-758F-4444-854B-D83B16E05026",
      "properties": {
        "name": "",
        "defaultflow": "false"
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-C5E4F172-1F78-4A23-BD04-93C87F880C0B"
      },
      "target": {
        "resourceId": "sid-DFAA8AA4-E8A6-4219-A02C-9D387CD729E9"
      },
      "outgoing": [
        {
          "resourceId": "sid-DFAA8AA4-E8A6-4219-A02C-9D387CD729E9"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 160,
          "y": 40
        },
        "lowerRight": {
          "x": 280,
          "y": 40
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    }
  ],
  "bounds": {
    "lowerRight": {
      "x": 376,
      "y": 136
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
  "resourceId": "",
  "properties": {
    "process_id": "张三_1534750658064",
    "name": "asdf"
  },
  "stencil": {
    "id": "BPMNDiagram"
  },
  "childShapes": [
    {
      "resourceId": "sid-4F949E9C-3200-406C-869A-D38811B87EB0",
      "properties": {
        "formkeydefinition": "",
        "isCommiter": false,
        "assignee": "",
        "name": "开始",
        "gatewayType": ""
      },
      "stencil": {
        "id": "StartNoneEvent"
      },
      "incoming": [],
      "outgoing": [
        {
          "resourceId": "sid-80D17F66-E6E5-4BD6-8B50-8E22A0E47D1B"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 40,
          "y": 220
        },
        "lowerRight": {
          "x": 96,
          "y": 276
        }
      }
    },
    {
      "resourceId": "sid-C5E4F172-1F78-4A23-BD04-93C87F880C0B",
      "properties": {
        "formkeydefinition": "mcDiyForm01",
        "isCommiter": true,
        "assignee": "0001",
        "name": "张三",
        "gatewayType": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "incoming": [
        {
          "resourceId": "sid-80D17F66-E6E5-4BD6-8B50-8E22A0E47D1B"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-3525FD2D-2793-4EFF-9C99-A8725209DFDB"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 160,
          "y": 220
        },
        "lowerRight": {
          "x": 216,
          "y": 276
        }
      }
    },
    {
      "resourceId": "sid-DFAA8AA4-E8A6-4219-A02C-9D387CD729E9",
      "properties": {
        "formkeydefinition": "",
        "isCommiter": false,
        "assignee": "",
        "name": "结束",
        "gatewayType": ""
      },
      "stencil": {
        "id": "EndNoneEvent"
      },
      "incoming": [
        {
          "resourceId": "sid-3E248C40-758F-4444-854B-D83B16E05026"
        }
      ],
      "outgoing": [],
      "bounds": {
        "upperLeft": {
          "x": 1000,
          "y": 220
        },
        "lowerRight": {
          "x": 1056,
          "y": 276
        }
      }
    },
    {
      "resourceId": "sid-3F58F138-3194-4BD2-A45A-B27128BDFA2C",
      "properties": {
        "formkeydefinition": "",
        "isCommiter": false,
        "assignee": "",
        "name": "",
        "gatewayType": "fork"
      },
      "stencil": {
        "id": "ParallelGateway"
      },
      "incoming": [
        {
          "resourceId": "sid-3525FD2D-2793-4EFF-9C99-A8725209DFDB"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-541F4E5B-CF94-4829-A23A-5DFC84589F08"
        },
        {
          "resourceId": "sid-A2E046B0-A534-484D-A7D7-C609A60D9B6F"
        },
        {
          "resourceId": "sid-DB937AB8-CD0B-4347-B6FC-5878EBA44845"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 280,
          "y": 220
        },
        "lowerRight": {
          "x": 336,
          "y": 276
        }
      }
    },
    {
      "resourceId": "sid-BCC10AB0-687B-4FB0-A5EF-C4066288F36E",
      "properties": {
        "formkeydefinition": "",
        "isCommiter": false,
        "assignee": "",
        "name": "",
        "gatewayType": "join"
      },
      "stencil": {
        "id": "ParallelGateway"
      },
      "incoming": [
        {
          "resourceId": "sid-9A77AF49-4550-4B55-8135-0DA2F97B8737"
        },
        {
          "resourceId": "sid-6A07A0F4-839F-48C3-81EC-56D4EABC42FD"
        },
        {
          "resourceId": "sid-8B6090D1-5463-4B0F-82B6-7005E6F794DE"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-3E248C40-758F-4444-854B-D83B16E05026"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 880,
          "y": 220
        },
        "lowerRight": {
          "x": 936,
          "y": 276
        }
      }
    },
    {
      "resourceId": "sid-8C921D64-E5BB-44EB-AA23-2E7BA68C1463",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "isCommiter": false,
        "assignee": "1049",
        "name": "俞新海",
        "gatewayType": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "incoming": [
        {
          "resourceId": "sid-541F4E5B-CF94-4829-A23A-5DFC84589F08"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-21BBE48D-C9D9-4A3D-9513-3A3BD345AEAD"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 400,
          "y": 40
        },
        "lowerRight": {
          "x": 456,
          "y": 96
        }
      }
    },
    {
      "resourceId": "sid-D5F286A2-B24A-4615-A5F0-20898738CD65",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "isCommiter": false,
        "assignee": "1071",
        "name": "冯宇鹏",
        "gatewayType": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "incoming": [
        {
          "resourceId": "sid-A2E046B0-A534-484D-A7D7-C609A60D9B6F"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-6A07A0F4-839F-48C3-81EC-56D4EABC42FD"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 400,
          "y": 160
        },
        "lowerRight": {
          "x": 456,
          "y": 216
        }
      }
    },
    {
      "resourceId": "sid-8CD6A441-6945-4355-A242-C3649F53E016",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "isCommiter": false,
        "assignee": "1072",
        "name": "庞泓",
        "gatewayType": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "incoming": [
        {
          "resourceId": "sid-DB937AB8-CD0B-4347-B6FC-5878EBA44845"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-74018FEE-5D58-421B-BB60-2347D77A08CA"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 400,
          "y": 340
        },
        "lowerRight": {
          "x": 456,
          "y": 396
        }
      }
    },
    {
      "resourceId": "sid-6C195AFB-4027-4308-A8F7-B32CF2C2D9BF",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "isCommiter": false,
        "assignee": "1069",
        "name": "李亮",
        "gatewayType": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "incoming": [
        {
          "resourceId": "sid-21BBE48D-C9D9-4A3D-9513-3A3BD345AEAD"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-9A77AF49-4550-4B55-8135-0DA2F97B8737"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 520,
          "y": 40
        },
        "lowerRight": {
          "x": 576,
          "y": 96
        }
      }
    },
    {
      "resourceId": "sid-CE1A1E3A-2A53-4BD4-A128-3FFF0DDF6F93",
      "properties": {
        "formkeydefinition": "",
        "isCommiter": false,
        "assignee": "",
        "name": "",
        "gatewayType": "fork"
      },
      "stencil": {
        "id": "ParallelGateway"
      },
      "incoming": [
        {
          "resourceId": "sid-74018FEE-5D58-421B-BB60-2347D77A08CA"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-9D734F6E-9ED5-4FE6-91AF-886A642BE17D"
        },
        {
          "resourceId": "sid-F3234C50-2380-4A6F-A941-E1AA81857A4A"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 520,
          "y": 340
        },
        "lowerRight": {
          "x": 576,
          "y": 396
        }
      }
    },
    {
      "resourceId": "sid-FECFBB4B-49F1-4270-8316-132614BADA99",
      "properties": {
        "formkeydefinition": "",
        "isCommiter": false,
        "assignee": "",
        "name": "",
        "gatewayType": "join"
      },
      "stencil": {
        "id": "ParallelGateway"
      },
      "incoming": [
        {
          "resourceId": "sid-7F2AC0BE-F2B4-40CC-AF0B-82A76BD5CF2F"
        },
        {
          "resourceId": "sid-E61E2082-26DD-4B09-B1C9-B07A0AE19433"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-8B6090D1-5463-4B0F-82B6-7005E6F794DE"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 760,
          "y": 340
        },
        "lowerRight": {
          "x": 816,
          "y": 396
        }
      }
    },
    {
      "resourceId": "sid-1B91DF3D-641A-4A71-B429-E21D7C65F700",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "isCommiter": false,
        "assignee": "1096",
        "name": "李强",
        "gatewayType": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "incoming": [
        {
          "resourceId": "sid-9D734F6E-9ED5-4FE6-91AF-886A642BE17D"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-7F2AC0BE-F2B4-40CC-AF0B-82A76BD5CF2F"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 640,
          "y": 280
        },
        "lowerRight": {
          "x": 696,
          "y": 336
        }
      }
    },
    {
      "resourceId": "sid-8AA54626-83F9-409F-AE43-1FA1CE329AAD",
      "properties": {
        "formkeydefinition": "mcDiyForm02",
        "isCommiter": false,
        "assignee": "817031254523904",
        "name": "杜佳鹏",
        "gatewayType": ""
      },
      "stencil": {
        "id": "UserTask"
      },
      "incoming": [
        {
          "resourceId": "sid-F3234C50-2380-4A6F-A941-E1AA81857A4A"
        }
      ],
      "outgoing": [
        {
          "resourceId": "sid-E61E2082-26DD-4B09-B1C9-B07A0AE19433"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 640,
          "y": 400
        },
        "lowerRight": {
          "x": 696,
          "y": 456
        }
      }
    },
    {
      "resourceId": "sid-80D17F66-E6E5-4BD6-8B50-8E22A0E47D1B",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-4F949E9C-3200-406C-869A-D38811B87EB0"
      },
      "target": {
        "resourceId": "sid-C5E4F172-1F78-4A23-BD04-93C87F880C0B"
      },
      "outgoing": [
        {
          "resourceId": "sid-C5E4F172-1F78-4A23-BD04-93C87F880C0B"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 40,
          "y": 220
        },
        "lowerRight": {
          "x": 160,
          "y": 220
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-3E248C40-758F-4444-854B-D83B16E05026",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-BCC10AB0-687B-4FB0-A5EF-C4066288F36E"
      },
      "target": {
        "resourceId": "sid-DFAA8AA4-E8A6-4219-A02C-9D387CD729E9"
      },
      "outgoing": [
        {
          "resourceId": "sid-DFAA8AA4-E8A6-4219-A02C-9D387CD729E9"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 880,
          "y": 220
        },
        "lowerRight": {
          "x": 1000,
          "y": 220
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-3525FD2D-2793-4EFF-9C99-A8725209DFDB",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-C5E4F172-1F78-4A23-BD04-93C87F880C0B"
      },
      "target": {
        "resourceId": "sid-3F58F138-3194-4BD2-A45A-B27128BDFA2C"
      },
      "outgoing": [
        {
          "resourceId": "sid-3F58F138-3194-4BD2-A45A-B27128BDFA2C"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 160,
          "y": 220
        },
        "lowerRight": {
          "x": 280,
          "y": 220
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-541F4E5B-CF94-4829-A23A-5DFC84589F08",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-3F58F138-3194-4BD2-A45A-B27128BDFA2C"
      },
      "target": {
        "resourceId": "sid-8C921D64-E5BB-44EB-AA23-2E7BA68C1463"
      },
      "outgoing": [
        {
          "resourceId": "sid-8C921D64-E5BB-44EB-AA23-2E7BA68C1463"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 280,
          "y": 40
        },
        "lowerRight": {
          "x": 400,
          "y": 220
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-9A77AF49-4550-4B55-8135-0DA2F97B8737",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-6C195AFB-4027-4308-A8F7-B32CF2C2D9BF"
      },
      "target": {
        "resourceId": "sid-BCC10AB0-687B-4FB0-A5EF-C4066288F36E"
      },
      "outgoing": [
        {
          "resourceId": "sid-BCC10AB0-687B-4FB0-A5EF-C4066288F36E"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 520,
          "y": 40
        },
        "lowerRight": {
          "x": 880,
          "y": 220
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-A2E046B0-A534-484D-A7D7-C609A60D9B6F",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-3F58F138-3194-4BD2-A45A-B27128BDFA2C"
      },
      "target": {
        "resourceId": "sid-D5F286A2-B24A-4615-A5F0-20898738CD65"
      },
      "outgoing": [
        {
          "resourceId": "sid-D5F286A2-B24A-4615-A5F0-20898738CD65"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 280,
          "y": 160
        },
        "lowerRight": {
          "x": 400,
          "y": 220
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-6A07A0F4-839F-48C3-81EC-56D4EABC42FD",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-D5F286A2-B24A-4615-A5F0-20898738CD65"
      },
      "target": {
        "resourceId": "sid-BCC10AB0-687B-4FB0-A5EF-C4066288F36E"
      },
      "outgoing": [
        {
          "resourceId": "sid-BCC10AB0-687B-4FB0-A5EF-C4066288F36E"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 400,
          "y": 160
        },
        "lowerRight": {
          "x": 880,
          "y": 220
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-DB937AB8-CD0B-4347-B6FC-5878EBA44845",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-3F58F138-3194-4BD2-A45A-B27128BDFA2C"
      },
      "target": {
        "resourceId": "sid-8CD6A441-6945-4355-A242-C3649F53E016"
      },
      "outgoing": [
        {
          "resourceId": "sid-8CD6A441-6945-4355-A242-C3649F53E016"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 280,
          "y": 220
        },
        "lowerRight": {
          "x": 400,
          "y": 340
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-8B6090D1-5463-4B0F-82B6-7005E6F794DE",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-FECFBB4B-49F1-4270-8316-132614BADA99"
      },
      "target": {
        "resourceId": "sid-BCC10AB0-687B-4FB0-A5EF-C4066288F36E"
      },
      "outgoing": [
        {
          "resourceId": "sid-BCC10AB0-687B-4FB0-A5EF-C4066288F36E"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 760,
          "y": 220
        },
        "lowerRight": {
          "x": 880,
          "y": 340
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-21BBE48D-C9D9-4A3D-9513-3A3BD345AEAD",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-8C921D64-E5BB-44EB-AA23-2E7BA68C1463"
      },
      "target": {
        "resourceId": "sid-6C195AFB-4027-4308-A8F7-B32CF2C2D9BF"
      },
      "outgoing": [
        {
          "resourceId": "sid-6C195AFB-4027-4308-A8F7-B32CF2C2D9BF"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 400,
          "y": 40
        },
        "lowerRight": {
          "x": 520,
          "y": 40
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-74018FEE-5D58-421B-BB60-2347D77A08CA",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-8CD6A441-6945-4355-A242-C3649F53E016"
      },
      "target": {
        "resourceId": "sid-CE1A1E3A-2A53-4BD4-A128-3FFF0DDF6F93"
      },
      "outgoing": [
        {
          "resourceId": "sid-CE1A1E3A-2A53-4BD4-A128-3FFF0DDF6F93"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 400,
          "y": 340
        },
        "lowerRight": {
          "x": 520,
          "y": 340
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-9D734F6E-9ED5-4FE6-91AF-886A642BE17D",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-CE1A1E3A-2A53-4BD4-A128-3FFF0DDF6F93"
      },
      "target": {
        "resourceId": "sid-1B91DF3D-641A-4A71-B429-E21D7C65F700"
      },
      "outgoing": [
        {
          "resourceId": "sid-1B91DF3D-641A-4A71-B429-E21D7C65F700"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 520,
          "y": 280
        },
        "lowerRight": {
          "x": 640,
          "y": 340
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-7F2AC0BE-F2B4-40CC-AF0B-82A76BD5CF2F",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-1B91DF3D-641A-4A71-B429-E21D7C65F700"
      },
      "target": {
        "resourceId": "sid-FECFBB4B-49F1-4270-8316-132614BADA99"
      },
      "outgoing": [
        {
          "resourceId": "sid-FECFBB4B-49F1-4270-8316-132614BADA99"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 640,
          "y": 280
        },
        "lowerRight": {
          "x": 760,
          "y": 340
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-F3234C50-2380-4A6F-A941-E1AA81857A4A",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-CE1A1E3A-2A53-4BD4-A128-3FFF0DDF6F93"
      },
      "target": {
        "resourceId": "sid-8AA54626-83F9-409F-AE43-1FA1CE329AAD"
      },
      "outgoing": [
        {
          "resourceId": "sid-8AA54626-83F9-409F-AE43-1FA1CE329AAD"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 520,
          "y": 340
        },
        "lowerRight": {
          "x": 640,
          "y": 400
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    },
    {
      "resourceId": "sid-E61E2082-26DD-4B09-B1C9-B07A0AE19433",
      "properties": {
        "name": "",
        "defaultflow": "false",
        "condition": ""
      },
      "stencil": {
        "id": "SequenceFlow"
      },
      "source": {
        "resourceId": "sid-8AA54626-83F9-409F-AE43-1FA1CE329AAD"
      },
      "target": {
        "resourceId": "sid-FECFBB4B-49F1-4270-8316-132614BADA99"
      },
      "outgoing": [
        {
          "resourceId": "sid-FECFBB4B-49F1-4270-8316-132614BADA99"
        }
      ],
      "bounds": {
        "upperLeft": {
          "x": 640,
          "y": 340
        },
        "lowerRight": {
          "x": 760,
          "y": 400
        }
      },
      "dockers": [
        {
          "x": 56,
          "y": 28
        },
        {
          "x": 0,
          "y": 28
        }
      ]
    }
  ],
  "bounds": {
    "lowerRight": {
      "x": 1096,
      "y": 496
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
