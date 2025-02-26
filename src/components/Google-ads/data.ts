import { Label } from "recharts";

// data.ts
export const treeData = [
    {
        id: "960-065-7935 H MCC - MCC",
        children: [
            {
                id: "921-528-1668 ",
                label:"2ND AMEN EDC",
                email: "adt764489@gmail.com",
            },
            {
                id: "951-654-9876 ",
                label:"Another Deep Node",
                email: "adt764489@gmail.com",

                children: [
                    {
                        id: "526-547-2750 ",
                        label:"Aqua Real Estate",
                        email: "adt764489@gmail.com",
                        children: [
                            {
                                id: "137-285-7966",
                                label:"HGV Med Ashfack",
                                email: "adt764489@gmail.com",
                                children: [
                                    {
                                        id: "911-654-3321",
                                        label:" Deepest Node 1",
                                        email: "adt764489@gmail.com",
                                    },
                                    {
                                        id: "912-654-3322",
                                        label:" Deepest Node 2",
                                        email: "adt764489@gmail.com",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: "912-654-3322",
                label:" Deepest Node 2",
                email: "adt764489@gmail.com",
                children: [
                    {
                        id: "137-285-7966",
                        label:"HGV Med Ashfack",
                        email: "adt764489@gmail.com",
                        children: [
                            {
                                id: "911-654-3321",
                                label:" Deepest Node 1",
                                email: "adt764489@gmail.com",
                            },
                            {
                                id: "912-654-3322",
                                label:" Deepest Node 2",
                                email: "adt764489@gmail.com",
                            },
                        ],
                    },
                ],
            },
        ],
        
    },
    {
        id: "960-065-7955 H MCC - MCC",
        children: [
            {
                id: "921-528-1668",
                label:"2ND AMEN EDC",
                email: "adt764489@gmail.com",
                children: [
                    {
                        id: "526-547-2750",
                        label:"Aqua Real Estate",
                        email: "adt764489@gmail.com",
                    },
                    {
                        id: "137-285-7966",
                        label:" HGV Med Ashfack",
                        email: "adt764489@gmail.com",
                        children: [
                            {
                                id: "921-528-1668",
                                label:"2ND AMEN EDC",
                                email: "adt764489@gmail.com",
                                children: [
                                    {
                                        id: "951-654-9876",
                                        label:"Another Deep Node",
                                        email: "adt764489@gmail.com",
                                    },
                                    {
                                        id: "951-654-9876 ",
                                        label:"Another Deep Node 2",
                                        email: "adt764489@gmail.com",
                                    },
                                    {
                                        id: "951-654-9876 ",
                                        label:"Another Deep Node 3",
                                        email: "adt764489@gmail.com",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
