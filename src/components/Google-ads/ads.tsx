"use client";

import { useReducer, useState } from "react";
import { treeData } from "../../components/Google-ads/data";
import './style.css'

interface TreeNode {
    id: string;
    email?: string;
    children?: TreeNode[];
}

type TreeAction = { type: "TOGGLE" };

const treeReducer = (state: boolean, action: TreeAction): boolean => {
    return !state; // Toggle the expanded state
};

const TreeNodeComponent = ({ node, isChild = false }: { node: TreeNode; isChild?: boolean }) => {
    const [isExpanded, dispatch] = useReducer(treeReducer, true);

    return (
        <div className="relative p-1">
            <div
                className="flex items-center gap-2 cursor-pointer py-2 pl-4 hover:bg-gray-100 transition-all duration-200"
                onClick={() => dispatch({ type: "TOGGLE" })}
            >
                <div className="flex  items-center justify-start">
                    {isChild && <div className="h-[1.5px] bg-[#333333] w-[10px] -ml-5 mr-2"></div>}

                    <h1 className="font-medium text-[12px] leading-[18px] text-[#333333]">{node.id}</h1>
                    {node.email && (
                        <p className="text-[12px] leading-[18px] font-normal text-gray-500 ml-1">
                            - Linked from {node.email}
                        </p>
                    )}
                </div>
                {node.children && (
                    <span className="text-gray-500">
                        {isExpanded ? (
                            <img src="/icons/down-arrow.png" className="h-[7px]" />
                        ) : (
                            <img src="/icons/down-arrow.png" className="h-[7px] -rotate-90" />
                        )}
                    </span>
                )}
            </div>

            {isExpanded && node.children && (
                <div className="ml-4 border-l-2 border-[#333333]">
                    {node.children.map((child) => (
                        <TreeNodeComponent key={child.id} node={child} isChild={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function TreeView() {
    const [searchTerm, setSearchTerm] = useState("");

    // function to filter tree nodes
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

            <div className="border rounded-md my-3 py-3 px-8">
                {filteredData.length > 0 ? (
                    filteredData.map((node) => <TreeNodeComponent key={node.id} node={node} />)
                ) : (
                    <p className="text-gray-500 text-sm text-center">No results found.</p>
                )}
            </div>
        </div>
    );
}