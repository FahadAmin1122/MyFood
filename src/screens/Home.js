import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import pic1 from "../assets/pic1.jpg"
import pic2 from "../assets/pic2jpg.jpg"
import pic3 from "../assets/pic3.jpg"
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [FoodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    console.log(response);
    // console.log(response[1][0].CategoryName)
    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner img-fluid" id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src={pic1} className="d-block w-100 " style={{filter: "brightness(30%)"}} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={pic2} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src={pic3} className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'> {/* boootstrap is mobile first */}
        {
          // foodCat != []
          //   ? foodCat.map((data) => {
          //     console.log(data,"food catagory");
          //     return (
          //       // justify-content-center
          //       <div className='row mb-3'>
          //         <div key={data.id} className='fs-3 m-3'>
          //           {data.CategoryName}
          //         </div>
          //         <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
          //         {FoodItems != [] ? FoodItems.filter(
          //           (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
          //           .map(filterItems => {
          //             return (
          //               <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
          //                 {console.log(filterItems.url)}
          //                 <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
          //               </div>
          //             )
          //           }) : <div> No Such Data </div>}
          //       </div>
          //     )
          //   })
          //   : ""}

          foodCat.length > 0
            ? foodCat.map((data) => {
              // console.log(data, "food category");
              return (
                <div className="row mb-3" key={data.id}>
                  <div className="fs-3 m-3">{data.CategoryName}</div>
                  <hr
                    id="hr-success"
                    style={{
                      height: "4px",
                      backgroundImage:
                        "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                    }}
                  />
                  {FoodItems.length > 0
                    ? FoodItems.filter(
                      (items) =>
                        items.CategoryName === data.CategoryName &&
                        items.name.toLowerCase().includes(search.toLowerCase())
                    ).map((filterItems) => {
                      // Safely access options[0]
                      const options = filterItems.options?.[0] || {}; // Use empty object if undefined
                      return (
                        <div
                          key={filterItems._id} // Use _id for unique key
                          className="col-12 col-md-6 col-lg-3"
                        >
                          {/* {console.log(filterItems.url)} */}
                          <Card
                            foodName={filterItems.name}
                            item={filterItems}
                            options={options} // Pass the safe `option`
                            ImgSrc={filterItems.img}
                          ></Card>
                        </div>
                      );
                    })
                    : "No Such Data"}
                </div>
              );
            })
            : ""}
      </div>
      <Footer />
    </div>
  )
}
