"use client";

import React, { useState } from "react";
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

    async function onSubmit(
      data: FormData,
      event?: React.BaseSyntheticEvent
    ): Promise<void> {
      try {
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
        <Button type="submit">Submit</Button>
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
    </div>
  );
}

