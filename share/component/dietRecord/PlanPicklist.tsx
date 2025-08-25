"use client";
import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string,
    rating: number;
}

interface PickListChangeEvent {
    source: Product[];
    target: Product[];
}


export default function PlanPicklist(){
    const initialProducts: Product[] = [
        { id: '1', code: 'P001', name: 'Laptop Pro', description: 'High-performance laptop', price: 999.99, category: 'Electronics', quantity: 10, inventoryStatus: 'INSTOCK', rating: 4 },
        { id: '2', code: 'P002', name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, category: 'Accessories', quantity: 50, inventoryStatus: 'INSTOCK', rating: 3 },
        { id: '3', code: 'P003', name: 'USB-C Hub', description: 'Multi-port USB-C adapter', price: 49.99, category: 'Accessories', quantity: 20, inventoryStatus: 'INSTOCK', rating: 4 },
        { id: '4', code: 'P004', name: 'Gaming Keyboard', description: 'RGB mechanical keyboard', price: 79.99, category: 'Electronics', quantity: 15, inventoryStatus: 'LOWSTOCK', rating: 5 },
        { id: '5', code: 'P005', name: 'External SSD', description: '1TB portable SSD', price: 129.99, category: 'Storage', quantity: 8, inventoryStatus: 'INSTOCK', rating: 4 },
    ];

    const [source, setSource] = useState<Product[]>(initialProducts);
    const [target, setTarget] = useState<Product[]>([]);

    const onChange = (event: PickListChangeEvent) => {
        setSource(event.source);
        setTarget(event.target);
        console.log(target);
    };

    const itemTemplate = (item: Product) => {
    return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item.category}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.price}</span>
            </div>
        );
    };


    return(
        <div className="card">
            <PickList 
                source={source} 
                target={target} 
                onChange={onChange} 
                itemTemplate={itemTemplate} 
                dataKey="id"
                breakpoint="1400px"
                sourceHeader="Available" 
                targetHeader="Selected" 
                sourceStyle={{height: '5rem' }} 
                targetStyle={{height: '5rem' }} 
                showSourceControls={false}
                showTargetControls={false}
            />    
        </div>
    )
}