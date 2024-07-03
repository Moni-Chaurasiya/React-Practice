import { useState } from "react";



function ProductCategoryRow({category}){
 return(
    <>
     <tr>
        <th colSpan="2">
            {category}
        </th>
     </tr>
    </>
 );
}

function ProductRow({product}){
    const name= product.stocked ? product.name :
    <span style={{color: 'red'}}>
        {product.name}
    </span>
    return(
        <>
        <tr>
            <td>{name}</td>
            <td>{product.prices}</td>
        </tr>
        </>
    );
    
}

function ProductTable({products,filterText,inStockOnly}){
    const rows=[];
    let lastCategory =null;

    products.forEach((product)=>{
        if(product.name.toLowerCase().indexOf(
            filterText.toLowerCase()
        )===-1){
            return ;
        }
        if(inStockOnly && !product.stocked){
            return;
        }

        if(product.category !== lastCategory){
            rows.push(
                <ProductCategoryRow
                category={product.category}
                key={product.category}
                />
            );
        }
        rows.push(
            <ProductRow
            product={product}
            key={product.name}
        
           
            />
        );
        lastCategory=product.category;
       
    })
    return(
    <>
    <table>
        <thead>
           <tr>
            <th>Name </th>
            <th>Prices </th>
           </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
    </table>
    </>
    );
}


function SearchBar({filterText,inStockOnly,onFilterTextChange,onInStockOnlyChange}){
    return(
       <>
       <form>
        <input type="text" value={filterText} placeholder=" Search..." onChange={(e)=> onFilterTextChange(e.target.value)}/>
        <label>
            <input type="checkbox" checked={inStockOnly} onChange={(e)=>onInStockOnlyChange(e.target.checked)}/>
            {' '}
            Only show product in stock
        </label>
       </form>
       
       </> 
    );
}


function FilterableProductTable({products}){
    const [filterText,setFilterText] = useState('');
    const[inStockOnly,setInStockOnly] =useState(false);
    return(
     <div>
       <SearchBar filterText={filterText} inStockOnly={inStockOnly}
       onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly} />
       <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}/>
     </div>
    );

}

const PRODUCTS=[
    {category:"Fruits",prices:"$1",stocked:true,name:"Apple"},
    {category:"Fruits",prices:"$2",stocked:false,name:"Banana"},
    {category:"Fruits",prices:"$5",stocked:true,name:"Dragonfruit"},
    {category:"Vegetables",prices:"$1",stocked:true,name:"Potato"},
    {category:"Vegetables",prices:"$3",stocked:true,name:"Pumpkin"},
    {category:"Vegetables",prices:"$1",stocked:false,name:"Peas"},
]
 function Start(props){
    return <FilterableProductTable products={PRODUCTS}/>
    
 }

 export default Start;