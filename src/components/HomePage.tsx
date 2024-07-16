import HomeCards from "../commonComponents/HomeCards";

const imagesData = [
  {
    // src: 'https://images-eu.ssl-images-amazon.com/images/G/3…an/GATEWAY/MSO/B07G5J5FYP._SY232_CB667322346_.jpg',
    src:'https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667_640.jpg',
    alt: 'Microwaves',
    categoryName:'Microwaves',
    categoryId: 'category1'
  },
  {
    src: 'https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg',
    alt: 'Refrigerators',
    categoryName:'Refrigerators',
    categoryId: 'category2'
  },
  {
    src: 'https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg',
    alt: 'Image 3',
    categoryName:'Air conditioners',
    categoryId: 'category3'
  },
  {
    src: 'https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg',
    alt: 'Washing machines',
    categoryName:'Washing machines',
    categoryId: 'category4'
  }
];


function HomePage() {
  return (
    <div>
      <div style={{display:'flex',flexDirection:'row'}}>
        <HomeCards cardData={imagesData} header="Home appliances" />
        <HomeCards cardData={imagesData} header="Home appliances" />
        <HomeCards cardData={imagesData} header="Home appliances" />
        <HomeCards cardData={imagesData} header="Home appliances" />

        {/* <HomeCards cardData={imagesData} header="Home appliances" />
        <HomeCards cardData={imagesData} header="Home appliances" />
        <HomeCards cardData={imagesData} header="Home appliances" /> */}

      </div>
    </div>
  )
}

export default HomePage
