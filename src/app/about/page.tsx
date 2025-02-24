"use client";

import { useReducer } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { treeData } from "../../components/Google-ads/data";

interface TreeNode {
    id: string;
    email?: string;
    children?: TreeNode[];
}

interface TreeState {
    expandedNodes: Record<string, boolean>;
}

type TreeAction = { type: "TOGGLE_NODE"; id: string };

const treeReducer = (state: TreeState, action: TreeAction): TreeState => {
    const { id } = action;
    const updatedNodes = { ...state.expandedNodes, [id]: !state.expandedNodes[id] };

    // Collapse all child nodes when parent is collapsed
    if (!updatedNodes[id]) {
        Object.keys(updatedNodes).forEach((key) => {
            if (key.startsWith(id + "-")) {
                delete updatedNodes[key];
            }
        });
    }

    return { expandedNodes: updatedNodes };
};

// Function to get all node IDs from treeData recursively
const getAllNodeIds = (nodes: TreeNode[]): Record<string, boolean> => {
    let ids: Record<string, boolean> = {};
    nodes.forEach((node) => {
        ids[node.id] = true; // Expand the current node
        if (node.children) {
            ids = { ...ids, ...getAllNodeIds(node.children) }; // Merge child nodes
        }
    });
    return ids;
};

const TreeNodeComponent = ({
    isFirstParent,
    node,
    toggleNode,
    isExpanded,
}: {
    isFirstParent: boolean;
    node: TreeNode;
    toggleNode: (id: string) => void;
    isExpanded: (id: string) => boolean;
}) => {
    return (
        <div className="relative p-1">
            <div
                className="flex items-center gap-2 cursor-pointer py-2 pl-4 hover:bg-gray-100 transition-all duration-200"
                onClick={() => toggleNode(node.id)}
            >
                <div className="flex items-center justify-start">
                    {!isFirstParent && (
                        <div className="h-[1px] bg-[#333333] w-[10px] -ml-5 mr-2"></div>
                    )}
                    <h1 className="font-medium text-[12px] leading-[18px] text-[#333333]">{node.id}</h1>
                    {node.email && <p className="text-[12px] leading-[18px] font-normal text-gray-500 ml-1">- Linked from {node.email}</p>}
                </div>
                {node.children && (
                    <span className="text-gray-500  ">
                        {isExpanded(node.id) ? <FaChevronDown className="h-3" /> : <FaChevronRight className="h-3" />}
                    </span>
                )}
            </div>

            {isExpanded(node.id) && node.children && (
                <div className="ml-4 border-l-2 border-height-[20%] border-[#333333] ">
                    {node.children.map((child) => (
                        <TreeNodeComponent isFirstParent={false} key={child.id} node={child} toggleNode={toggleNode} isExpanded={isExpanded} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function TreeView() {
    // Initialize the expandedNodes state with all nodes set to true
    const [state, dispatch] = useReducer(treeReducer, { expandedNodes: getAllNodeIds(treeData) });

    const toggleNode = (id: string) => dispatch({ type: "TOGGLE_NODE", id });
    const isExpanded = (id: string) => !!state.expandedNodes[id];

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg w-[1108px] mt-20 mx-auto">
            {/* Header */}
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
                            className="bg-transparent outline-none text-[12px] leading-[20px] font-medium text-[#898D9F] w-full"
                        />
                    </div>
                    {/* Menu Button */}
                    <button className="border border-gray-300 p-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center">
                        <img src="/icons/menu.png" alt="Menu" className="h-[14px] w-[17px] opacity-80" />
                    </button>
                </div>
            </div>

            {/* Tree View */}
            <div className="border rounded-md my-3 py-3 px-8">
                {treeData.map((node) => (
                    <TreeNodeComponent isFirstParent={true} key={node.id} node={node} toggleNode={toggleNode} isExpanded={isExpanded} />
                ))}
            </div>
        </div>
    );
}
