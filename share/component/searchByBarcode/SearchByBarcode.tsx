"use client";

import React, { useEffect, useRef, useState,useContext  } from "react";
import {Carousel, CarouselResponsiveOption} from 'primereact/carousel'
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";

interface Product {
    id: string;
    name: string;
    fat: string;
    kcal: string;
    countries: string;
    proteins: string;
    salt: string;
    sugars: string;
    fiber: string;
    sodium: string;
    saturated_fat: string;
    carbohydrates: string;
}

interface FormData {
  barcode: string;
}

interface OpenFoodFactsProduct {
  product_name: string;
  countries: string;
  nutriments: {
    fat_100g: string;
    'energy-kcal_100g': string;
    proteins_100g: string;
    salt_100g: string;
    sugars_100g: string;
    fiber_100g: string;
    sodium_100g: string;
    'saturated-fat_100g': string;
    carbohydrates_100g: string;
  };
}

interface OpenFoodFactsResponse {
  status: number;
  product: OpenFoodFactsProduct;
}

export default function SearchByBarcode() {
  const [name,setName] = useState('');
  const [fat,setFat] = useState('');
  const [kcal,setKcal] = useState('');
  const [countries, setCountries] = useState('');
  const [proteins, setProteins] = useState('');
  const [salt, setSalt] = useState('');
  const [sugars, setSugars] = useState('');
  const [fiber, setFiber] = useState('');
  const [sodium, setSodium] = useState('');
  const [saturated_fat, setSaturatedFat] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  // const [products, setProducts] = useState<Product[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      barcode: '',
    },
  });

  const responsiveOptions: CarouselResponsiveOption[] = [
      {
          breakpoint: '2607px',
          numVisible: 3,
          numScroll: 5
      },
      {
          breakpoint: '1000px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '600px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  
  const products = [{ 
      name:'test1', fat:'51', kcal:'50', id: '1' 
    },
    {
      name:'test2', fat:'41', kcal:'', id: '2'
    },
        {
      name:'test3', fat:'', kcal:'12', id: '3'
    },
    {
      name:'test4', fat:'55', kcal:'23', id: '4'
    },
    {
      name:'test5', fat:'11', kcal:'42', id: '5'
    },
  ]


    async function onSubmit(
      data: FormData,
      event?: React.BaseSyntheticEvent
    ): Promise<void> {
      try {
        // Log form data
        console.log('Submitted Data:', data);

        // Fetch nutritional data from Open Food Facts API if barcode is provided
        if (data.barcode) {
          const response = await fetch(
            `https://world.openfoodfacts.org/api/v0/product/${data.barcode}.json`
          );
          const apiData: OpenFoodFactsResponse = await response.json();
          if (apiData.status === 1) {
            const product = apiData.product;

            setName(!product.product_name?'No Record': product.product_name);
            setFat(!product.nutriments.fat_100g?'No Record':product.nutriments.fat_100g);
            setKcal(!product.nutriments["energy-kcal_100g"]?'No Record':product.nutriments["energy-kcal_100g"]);
            setCountries(!product.countries?'No Record':product.countries);
            setSaturatedFat(!product.nutriments["saturated-fat_100g"]?'No Record': product.nutriments["saturated-fat_100g"]);
            setSodium(!product.nutriments.sodium_100g?'No Record': product.nutriments.sodium_100g);
            setFiber(!product.nutriments.fiber_100g?'No Record': product.nutriments.fiber_100g);
            setSugars(!product.nutriments.sugars_100g?'No Record': product.nutriments.sugars_100g);
            setSalt(!product.nutriments.salt_100g?'No Record': product.nutriments.salt_100g);
            setProteins(!product.nutriments.proteins_100g?'No Record': product.nutriments.proteins_100g);
            setCarbohydrates(!product.nutriments.carbohydrates_100g?'No Record': product.nutriments.carbohydrates_100g);
          } else {
            console.log('Product not found');
          }
        }
        reset();
      } catch (error) {
        console.error('Error:', error);
      }
    }

  const productTemplate = (product:Product) => {
      return (
          <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
              <div className="mb-3">
      
              </div>
              <div>
                  <h4 className="mb-1">{product.name}</h4>
                  <h6 className="mt-0 mb-3">{product.kcal}</h6>
                  <h6 className="mt-0 mb-3">{product.fat}</h6>
                  <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                      <Button icon="pi pi-search" className="p-button p-button-rounded" />
                      <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
                  </div>
              </div>
          </div>
      );
  };

return (
    <div>
      <h1>Track Food Intake By Barcode</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Barcode: </label>
          <input
            type="text"
            {...register('barcode')}
            placeholder="Enter barcode for nutrition lookup"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
        <div>
          <label>產品名稱: </label>
          <b>{name}</b>
        </div>
        <div>
          <label>脂肪含量: </label>
          <b>{fat}</b> <i> g/100g</i>
        </div>
        <div>
          <label>熱量: </label>
          <b>{kcal}</b> <i> kcal/100g</i>
        </div>
        <div>
          <label>蛋白質: </label>
          <b>{proteins}</b> <i> g/100g</i>
        </div>
        <div>
          <label>碳水化合物: </label>
          <b>{carbohydrates}</b> <i> g/100g</i>
        </div>
        <div>
          <label>糖份: </label>
          <b>{sugars}</b> <i> g/100g</i>
        </div>
        <div>
          <label>鹽份: </label>
          <b>{salt}</b> <i> g/100g</i>
        </div>
        <div>
          <label>膳食纖維: </label>
          <b>{fiber}</b> <i> g/100g</i>
        </div>
        <div>
          <label>鈉: </label>
          <b>{sodium}</b> <i> g/100g</i>
        </div>
        <div>
          <label>飽和脂肪: </label>
          <b>{saturated_fat}</b> <i> g/100g</i>
        </div>
        <div>
          <label>國家: </label>
          <b>{countries}</b>
        </div>
        <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
    </div>
  );
}

