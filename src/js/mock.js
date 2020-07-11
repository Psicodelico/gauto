var yb_mock = [
    [{
            id: 'vim_13209',
            type: 'VIM',
            relations: [{
                id: 'fafbffab-dca4-40a8-aee7-244e8e92ee17',
                linktype: 'toVnf'
            }]
        },
        {
            id: 'fafbffab-dca4-40a8-aee7-244e8e92ee17',
            type: 'VNF',
            relations: [{
                    id: 'b5a4ad9a-fdb4-4bfc-9310-6821a875bf94',
                    linktype: 'toVm'
                },
                {
                    id: 'c135d249-65c4-4155-8404-031cecbbf170',
                    linktype: 'toVm'
                },
                {
                    id: 'cae34bfe-28a6-488d-abc9-b259daaa90a3',
                    linktype: 'toVm'
                },
                {
                    id: '3e0d935e-c94a-4d3a-bf15-61b0085c1491',
                    linktype: 'toVm'
                },
                {
                    id: 'bc248934-f21a-4d2a-a3a8-0689ecfd4e39',
                    linktype: 'toVm'
                },
                {
                    id: '10fc013f-7241-4407-98f0-6f2ca2e01bef',
                    linktype: 'toVm'
                },
                {
                    id: '391942b5-31a2-4243-a063-2b0498f9eb40',
                    linktype: 'toVm'
                }
            ]
        },
        {
            id: 'b5a4ad9a-fdb4-4bfc-9310-6821a875bf94',
            type: 'VM',
            relations: [{
                id: '7522eaf8-d98d-11e9-b3e7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: '7522eaf8-d98d-11e9-b3e7-0242ac11000b',
            type: 'HOST'
        },
        {
            id: 'c135d249-65c4-4155-8404-031cecbbf170',
            type: 'VM',
            relations: [{
                id: '7523090c-d98d-11e9-b3e7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: '7523090c-d98d-11e9-b3e7-0242ac11000b',
            type: 'HOST'
        },
        {
            id: 'cae34bfe-28a6-488d-abc9-b259daaa90a3',
            type: 'VM',
            relations: [{
                id: '7522f548-d98d-11e9-b3e7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: '7522f548-d98d-11e9-b3e7-0242ac11000b',
            type: 'HOST'
        },
        {
            id: '3e0d935e-c94a-4d3a-bf15-61b0085c1491',
            type: 'VM',
            relations: [{
                id: '7522fbe2-d98d-11e9-b3e7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: '7522fbe2-d98d-11e9-b3e7-0242ac11000b',
            type: 'HOST'
        },
        {
            id: 'bc248934-f21a-4d2a-a3a8-0689ecfd4e39',
            type: 'VM',
            relations: [{
                id: '7523027c-d98d-11e9-b3e7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: '7523027c-d98d-11e9-b3e7-0242ac11000b',
            type: 'HOST'
        },
        {
            id: '10fc013f-7241-4407-98f0-6f2ca2e01bef',
            type: 'VM',
            relations: [{
                id: '7522f200-d98d-11e9-b3e7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: '7522f200-d98d-11e9-b3e7-0242ac11000b',
            type: 'HOST'
        },
        {
            id: '391942b5-31a2-4243-a063-2b0498f9eb40',
            type: 'VM',
            relations: [{
                id: '75230c5e-d98d-11e9-b3e7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: '75230c5e-d98d-11e9-b3e7-0242ac11000b',
            type: 'HOST'
        }
    ],
    [{
            id: 'vim_13210',
            type: 'VIM',
            relations: [{
                id: 'fafbffab-dca4-40a8-aee7-244e8e92ee18',
                linktype: 'toVnf'
            }]
        },
        {
            id: 'fafbffab-dca4-40a8-aee7-244e8e92ee18',
            type: 'VNF',
            relations: [{
                    id: 'asdf',
                    linktype: 'toVm'
                },
                {
                    id: 'a2',
                    linktype: 'toVm'
                },
                /* {
                    id: 'b5a4ad9a-fdb4-4bfc-9310-6821a875bf94',
                    linktype: 'toVm'
                },
                {
                    id: '391942b5-31a2-4243-a063-2b0498f9eb40',
                    linktype: 'toVm'
                },
                {
                    id: 'c135d249-65c4-4155-8404-031cecbbf170',
                    linktype: 'toVm'
                },
                {
                    id: 'cae34bfe-28a6-488d-abc9-b259daaa90a3',
                    linktype: 'toVm'
                },
                {
                    id: 'bc248934-f21a-4d2a-a3a8-0689ecfd4e39',
                    linktype: 'toVm'
                } */
            ]
        },
        {
            id: 'asdf',
            type: 'VM',
            relations: [{
                id: 'f10e9bba-d4df-11e9-86c7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: 'f10e9bba-d4df-11e9-86c7-0242ac11000b',
            type: 'HOST'
        },
        {
            id: 'a2',
            type: 'VM',
            relations: [{
                id: 'f10e9bba-d4df-11e9-86c7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        /* {
            id: 'b5a4ad9a-fdb4-4bfc-9310-6821a875bf94',
            type: 'VM',
            relations: [{
                id: 'f10e97e6-d4df-11e9-86c7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: 'f10e97e6-d4df-11e9-86c7-0242ac11000b',
            type: 'HOST'
        },
        {
            id: '391942b5-31a2-4243-a063-2b0498f9eb40',
            type: 'VM',
            relations: [{
                id: 'f10e9bba-d4df-11e9-86c7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: 'c135d249-65c4-4155-8404-031cecbbf170',
            type: 'VM',
            relations: [{
                id: 'f10e99d0-d4df-11e9-86c7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: 'f10e99d0-d4df-11e9-86c7-0242ac11000b',
            type: 'HOST'
        },
        {
            id: 'cae34bfe-28a6-488d-abc9-b259daaa90a3',
            type: 'VM',
            relations: [{
                id: 'f10e9bba-d4df-11e9-86c7-0242ac11000b',
                linktype: 'toHost'
            }]
        },
        {
            id: 'bc248934-f21a-4d2a-a3a8-0689ecfd4e39',
            type: 'VM',
            relations: [{
                id: 'f10e9bba-d4df-11e9-86c7-0242ac11000b',
                linktype: 'toHost'
            }]
        } */
    ]
];