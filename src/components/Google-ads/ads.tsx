"use client";

import { useReducer, useState } from "react";
import { treeData } from "../../components/Google-ads/data";

// Define the TreeNode type
interface TreeNode {
    id: string;
    email?: string;
    label?:string;
    children?: TreeNode[];
}

// Reducer for toggling expansion
type TreeAction = { type: "TOGGLE" };
const treeReducer = (state: boolean, action: TreeAction): boolean => !state;

// TreeNode Component
const TreeNodeComponent = ({
    node,
    depth = 0,
    isLast = false
}: {
    node: TreeNode;
    depth?: number;
    isLast?: boolean;
}) => {
    const [isExpanded, dispatch] = useReducer(treeReducer, true);

    return (
        <div className="relative pl-4">
            {/* Node Item */}
            <div
                className="flex items-center space-x-2 cursor-pointer py-1 pl-4 hover:bg-gray-100 transition-all duration-200"
                onClick={() => dispatch({ type: "TOGGLE" })}
            >
                {/* Connector Lines */}
                <span className="relative">
                    {depth > 0 && !isLast ? (
                        <div className="absolute flex -left-4 top-0 w-4 h-full">
                            <span className="h-[38px] border-[1px] border-[#898D9F] z-50 "></span>
                            <span className="w-[70%] h-[1px] border-[#898D9F] border-[1px] mt-[50%] z-50"></span>
                        </div>

                    ) : depth > 0 && isLast ? (

                        <div className="absolute flex -left-4 top-0 w-4 h-[70%]">
                            <span className="h-full border-[1px] border-[#898D9F] z-50"></span>
                            <span className="w-[70%] h-[1px] border-[#898D9F] border-[1px] mt-auto z-50"></span>
                        </div>
                    ) : null}
                    <div className="flex items-center">
                        <div className="flex gap-1">
                        <h1 className="text-[#333333] font-medium text-[12px] leading-[18px] ">{node.id}</h1>
                        <h1 className="text-[#333333] font-medium text-[12px] leading-[18px]"> - {node.label}</h1>
                        </div>
                        {node.email && (
                            <p className="text-[12px] leading-[18px] font-normal text-[#333333] ml-1">
                                - Linked from {node.email}
                            </p>
                        )}
                    </div>
                </span>

                {/* Expand/Collapse Icon */}
                {node.children && node.children.length > 0 && (
                    <span className="cursor-pointer">
                        {isExpanded ? (
                            <img src="/icons/down-arrow.png" className="h-[7px]" />
                        ) : (
                            <img src="/icons/down-arrow.png" className="h-[7px] -rotate-90" />
                        )}
                    </span>
                )}

                {/* Node Label */}

            </div>

            {/* Render Children */}
            {isExpanded && (node.children?.length ?? 0) > 0 && (
                <div className="ml-4">
                    {node.children?.map((child, index) => (
                        <TreeNodeComponent
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            isLast={index === node.children!.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Tree View Component
export default function TreeView() {
    const [searchTerm, setSearchTerm] = useState("");

    // Function to filter tree nodes
    const filterTree = (nodes: TreeNode[]): TreeNode[] => {
        return nodes
            .map((node) => {
                const match =
                    node.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (node.email && node.email.toLowerCase().includes(searchTerm.toLowerCase()));

                const filteredChildren = node.children ? filterTree(node.children) : [];

                if (match || filteredChildren.length > 0) {
                    return { ...node, children: filteredChildren };
                }

                return null;
            })
            .filter(Boolean) as TreeNode[];
    };

    const filteredData = searchTerm ? filterTree(treeData) : treeData;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg w-[1108px] mt-10 mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-[16px] font-medium leading-[20px] text-[#333333]">
                    Google Ads Accounts Under <span className="font-bold">adt764489@gmail.com</span>
                </h1>
                <div className="flex gap-4">
                    {/* Search Input */}
                    <div className="flex items-center border border-[#EFEFF3] py-2 px-4 rounded-md gap-3">
                        <img src="/icons/search.png" alt="Search" className="h-[17px] w-[17px] opacity-70" />
                        <input
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent outline-none text-[12px] leading-[20px] font-medium text-[#898D9F] w-full"
                        />
                    </div>
                    {/* Menu Button */}
                    <button className="border p-2 rounded-md flex items-center justify-center">
                        <img src="/icons/menu.png" alt="Menu" className="h-[14px] w-[17px] opacity-80" />
                    </button>
                </div>
            </div>

            <div className="border rounded-md my-3 space-y-2 py-3 px-8">
                {filteredData.length > 0 ? (
                    filteredData.map((node) => <TreeNodeComponent key={node.id} node={node} />)
                ) : (
                    <p className="text-gray-500 text-sm text-center">No results found.</p>
                )}
            </div>
        </div>
    );
}
