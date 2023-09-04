import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {BASE_URL} from '../../BaseRealEstate'
import {motion} from 'framer-motion'
import CardComponent from '../../Components/CardComponent'
import {Modal} from 'react-bootstrap'
import HomeIcon from '@mui/icons-material/Home'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import {useNavigate} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

const Properties = ({token, adminId, agencyMainValidation}) => {
  const [showModalSingleProperty, setShowModalSingleProperty] = useState(false)
  const [propertySingleData, setpropertySingleData] = useState({})
  const [reloadData, setReloadData] = useState(false)
  const [propertyModal, setPropertyModal] = useState(false)
  const [favApiData, setFavApiData] = useState([])
  const navigate = useNavigate()
  const [userData, setUserData] = useState([])
  const user_id = localStorage.getItem('user_Id')
  const [propertyData, setPropertyData] = useState([])
  const [image, setimage] = useState([])
  const [citiesData, setCitiesData] = useState([])
  const [serachedCityData, setSerachedCityData] = useState([])
  const [inputData, setInputData] = useState({
    title: '',
    location: '',
    price: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    buyOrRent: '',
    cityId: '',
    propertyType: '',
    phone: '',
    description: '',
  })
  const [cityName, setCityName] = useState()
  const [cityId, setCityId] = useState()
  const handleChange = (e) => {
    const {name, value} = e.target
    setInputData({...inputData, [name]: value})
  }
  const handlePostProperty = async () => {
    const {
      title,
      location,
      price,
      size,
      bedrooms,
      buyOrRent,
      cityId,
      propertyType,
      bathrooms,
      phone,
      description,
    } = inputData
    const formData = new FormData()
    formData.append('title', title)
    formData.append('location', location)
    formData.append('price', price)
    formData.append('size', size)
    formData.append('bedrooms', bedrooms)
    formData.append('bathrooms', bathrooms)
    formData.append('buyOrRent', buyOrRent)
    formData.append('propertyType', propertyType)
    formData.append('phone', phone)
    formData.append('description', description)
    formData.append('user_id', user_id)
    formData.append('cityId', cityId)
    for (let i = 0; i < image.length; i++) {
      formData.append('image', image[i])
    }
    await axios
      .post(BASE_URL + '/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((val) => {
        console.log(val)
        setPropertyModal(false)
        setInputData({
          title: '',
          location: '',
          price: '',
          size: '',
          bedrooms: '',
          buyOrRent: '',
        })
      })
      .catch((e) => console.warn(e))
  }
  const handlePostFav = async (property_id) => {
    const user_id = localStorage.getItem('user_Id')
    await axios
      .post(
        BASE_URL + '/favorites/',
        {
          user_id,
          property_id,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Set the correct Content-Type
          },
        }
      )
      .then((val) => {
        console.log(val)
        console.log('Done')
      })
      .catch((e) => {
        console.log(e)
        console.log('Failed')
      })
  }
  const handlePostFeature = async (property_id) => {
    await axios
      .put(
        BASE_URL + '/properties/feature/' + property_id,
        {_id: property_id, is_featured: true},
        {
          headers: {
            'Content-Type': 'application/json', // Set the correct Content-Type
          },
        }
      )
      .then((val) => {
        if (val.status === 200) {
          setReloadData(!reloadData)
          window.alert('Success')
        }
      })
      .catch((e) => {
        console.log(e)
        window.alert('Failed')
      })
  }
  const handleRemoveFeature = async (property_id) => {
    await axios
      .put(
        BASE_URL + '/properties/feature/' + property_id,
        {_id: property_id, is_featured: false},
        {
          headers: {
            'Content-Type': 'application/json', // Set the correct Content-Type
          },
        }
      )
      .then((val) => {
        if (val.status === 200) {
          setReloadData(!reloadData)
          window.alert('Success')
        }
      })
      .catch((e) => {
        console.log(e)
        window.alert('Failed')
      })
  }
  const getDataProperty = async () => {
    await axios
      .get(BASE_URL + '/properties/')
      .then((val) => {
        setPropertyData(val.data)
      })
      .catch((e) => {
        console.log(e)
      })
    await axios
      .get(BASE_URL + '/users/')
      .then((val) => {
        setUserData(val.data)
      })
      .catch((e) => {
        console.log(e)
      })
    await axios
      .get(BASE_URL + '/cities/')
      .then((val) => {
        setCitiesData(val.data)
        setCityName(val.data[0]['name'])
        setCityId(val.data[0]['_id'])
      })
      .catch((e) => console.log(e))
  }
  const getFavDataAPI = async () => {
    await axios
      .get(BASE_URL + '/favorites/')
      .then((val) => {
        setFavApiData(val.data)
      })
      .catch((e) => console.log(e))
  }
  const getCitySearch = async () => {
    await axios
      .get(BASE_URL + '/properties/city/' + cityId)
      .then((val) => {
        setSerachedCityData(val.data)
      })
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    getDataProperty()
  }, [propertyModal, reloadData])
  useEffect(() => {
    getFavDataAPI()
  }, [])
  useEffect(() => {
    getCitySearch()
  }, [cityId])
  const handleMessage = async (id) => {
    await axios
      .get(BASE_URL + '/properties/' + id)
      .then((val) => {
        setShowModalSingleProperty(true)
        setpropertySingleData(val.data)
      })
      .catch((e) => console.log(e))
  }
  return (
    <div style={{marginTop: '10rem'}}>
      <div className='propertyDiv d-flex justify-content-center align-items-center flex-column'>
        <h2>Properties</h2>
      </div>
      <div className='my-4'>
        {citiesData.map((val) => (
          <button
            onClick={() => {
              setCityName(val.name)
              setCityId(val._id)
            }}
            className={`btnHover mx-2 my-4 ${cityId === val._id ? 'activeBtn' : ''}`}
          >
            {val.name}
          </button>
        ))}
        {serachedCityData.length !== 0 && <h2>Hot Properties in {cityName}</h2>}{' '}
        {serachedCityData.length !== 0 ? (
          <div className='container propertyCardsMain  row wd100vw'>
            {serachedCityData.map((val, i) => {
              const favProperty = favApiData.find((item) => item.property_id === val._id)
              return (
                <motion.div
                  key={val._id}
                  whileTap={{scale: 1.1}}
                  whileHover={{scale: 1.05}}
                  className='propertyCard col-md-4 curserPointer'
                >
                  <CardComponent
                    handleReadMore={() => {
                      if (user_id !== null) {
                        navigate('/properties/' + val._id)
                      }
                    }}
                    contactInfo={val.phone}
                    is_featured={val.is_featured}
                    adminId={adminId}
                    handlePostFeature={handlePostFeature}
                    handleRemoveFeature={handleRemoveFeature}
                    file={val.image[0]}
                    uid={val.user_id}
                    currentUser={user_id}
                    title={val.title}
                    price={val.price}
                    bedrooms={val.bedrooms}
                    size={val.size}
                    location={val.location}
                    rating={null}
                    handlePostFav={handlePostFav}
                    property_id={val._id}
                    fav_id={favProperty !== undefined && favProperty.property_id}
                    description={null}
                    // handleMessage={() => {
                    //   navigate("/messages/" + val.user_id);
                    // }}
                    handleMessage={() => handleMessage(val._id)}
                  />
                </motion.div>
              )
            })}
          </div>
        ) : (
          <h2 className='text-center'>Nothing to show!</h2>
        )}
      </div>
      {propertyData.filter((val) => val.buyOrRent === 'buy').length !== 0 && (
        <div className='my-4'>
          <h2>Properties for Buy</h2>
          <div className='container propertyCardsMain  row wd100vw'>
            {propertyData
              .filter((val) => val.buyOrRent === 'buy')
              .map((val, i) => {
                const favProperty = favApiData.find((item) => item.property_id === val._id)
                return (
                  <motion.div
                    // onClick={() => {
                    //   if (user_id !== null) {
                    //     navigate("/properties/" + val._id);
                    //   }
                    // }}
                    key={val._id}
                    whileTap={{scale: 1.1}}
                    whileHover={{scale: 1.05}}
                    className='propertyCard col-md-4 curserPointer'
                  >
                    <CardComponent
                      handleReadMore={() => {
                        if (user_id !== null) {
                          navigate('/properties/' + val._id)
                        }
                      }}
                      contactInfo={val.phone}
                      is_featured={val.is_featured}
                      adminId={adminId}
                      handlePostFeature={handlePostFeature}
                      handleRemoveFeature={handleRemoveFeature}
                      file={val.image[0]}
                      uid={val.user_id}
                      currentUser={user_id}
                      title={val.title}
                      price={val.price}
                      bedrooms={val.bedrooms}
                      size={val.size}
                      location={val.location}
                      rating={null}
                      handlePostFav={handlePostFav}
                      property_id={val._id}
                      fav_id={favProperty !== undefined && favProperty.property_id}
                      description={null}
                      // handleMessage={() => {
                      //   navigate("/messages/" + val.user_id);
                      // }}
                      handleMessage={() => handleMessage(val._id)}
                    />
                  </motion.div>
                )
              })}
          </div>
        </div>
      )}
      {propertyData.filter((val) => val.buyOrRent === 'rent').length !== 0 && (
        <div className='my-4'>
          <h2>Properties for Rent</h2>
          <div className='container propertyCardsMain  row wd100vw'>
            {propertyData
              .filter((val) => val.buyOrRent === 'rent')
              .map((val, i) => {
                const favProperty = favApiData.find((item) => item.property_id === val._id)
                return (
                  <motion.div
                    // onClick={() => {
                    //   if (user_id !== null) {
                    //     navigate("/properties/" + val._id);
                    //   }
                    // }}
                    key={val._id}
                    whileTap={{scale: 1.1}}
                    whileHover={{scale: 1.05}}
                    className='propertyCard col-md-4 curserPointer'
                  >
                    <CardComponent
                      handleReadMore={() => {
                        if (user_id !== null) {
                          navigate('/properties/' + val._id)
                        }
                      }}
                      contactInfo={val.phone}
                      is_featured={val.is_featured}
                      adminId={adminId}
                      handlePostFeature={handlePostFeature}
                      handleRemoveFeature={handleRemoveFeature}
                      file={val.image[0]}
                      uid={val.user_id}
                      currentUser={user_id}
                      title={val.title}
                      price={val.price}
                      bedrooms={val.bedrooms}
                      size={val.size}
                      location={val.location}
                      rating={null}
                      handlePostFav={handlePostFav}
                      property_id={val._id}
                      fav_id={favProperty !== undefined && favProperty.property_id}
                      description={null}
                      // handleMessage={() => {
                      //   navigate("/messages/" + val.user_id);
                      // }}
                      handleMessage={() => handleMessage(val._id)}
                    />
                  </motion.div>
                )
              })}
          </div>
        </div>
      )}
      {propertyData.filter((val) => val.is_featured === true).length !== 0 && (
        <div className='my-4'>
          <h2>Featured Properties</h2>
          <div className='container propertyCardsMain  row wd100vw'>
            {propertyData
              .filter((val) => val.is_featured === true)
              .map((val, i) => {
                const favProperty = favApiData.find((item) => item.property_id === val._id)
                return (
                  <motion.div
                    // onClick={() => {
                    //   if (user_id !== null) {
                    //     navigate("/properties/" + val._id);
                    //   }
                    // }}
                    key={val._id}
                    whileTap={{scale: 1.1}}
                    whileHover={{scale: 1.05}}
                    className='propertyCard col-md-4 curserPointer'
                  >
                    <CardComponent
                      handleReadMore={() => {
                        if (user_id !== null) {
                          navigate('/properties/' + val._id)
                        }
                      }}
                      contactInfo={val.phone}
                      is_featured={val.is_featured}
                      adminId={adminId}
                      handlePostFeature={handlePostFeature}
                      handleRemoveFeature={handleRemoveFeature}
                      file={val.image[0]}
                      uid={val.user_id}
                      currentUser={user_id}
                      title={val.title}
                      price={val.price}
                      bedrooms={val.bedrooms}
                      size={val.size}
                      location={val.location}
                      rating={null}
                      handlePostFav={handlePostFav}
                      property_id={val._id}
                      fav_id={favProperty !== undefined && favProperty.property_id}
                      description={null}
                      // handleMessage={() => {
                      //   navigate("/messages/" + val.user_id);
                      // }}
                      handleMessage={() => handleMessage(val._id)}
                    />
                  </motion.div>
                )
              })}
          </div>
        </div>
      )}
      {/* {propertyData.length !== 0 && (
        <div className="my-4">
          <h2>All Properties</h2>
          <div className="container propertyCardsMain  row wd100vw">
            {propertyData.map((val, i) => {
              const favProperty = favApiData.find(
                (item) => item.property_id === val._id
              );
              return (
                <motion.div
                  // onClick={() => {
                  //   if (user_id !== null) {
                  //     navigate("/properties/" + val._id);
                  //   }
                  // }}
                  key={val._id}
                  whileTap={{ scale: 1.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="propertyCard col-md-4 curserPointer"
                >
                  <CardComponent
                    handleReadMore={() => {
                      if (user_id !== null) {
                        navigate("/properties/" + val._id);
                      }
                    }}
                    contactInfo={val.phone}
                    is_featured={val.is_featured}
                    adminId={adminId}
                    handlePostFeature={handlePostFeature}
                    handleRemoveFeature={handleRemoveFeature}
                    file={val.image[0]}
                    uid={val.user_id}
                    currentUser={user_id}
                    title={val.title}
                    price={val.price}
                    bedrooms={val.bedrooms}
                    size={val.size}
                    location={val.location}
                    rating={null}
                    handlePostFav={handlePostFav}
                    property_id={val._id}
                    fav_id={
                      favProperty !== undefined && favProperty.property_id
                    }
                    description={null}
                    // handleMessage={() => {
                    //   navigate("/messages/" + val.user_id);
                    // }}
                    handleMessage={() => handleMessage(val._id)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      )} */}
      <Modal
        centered
        show={showModalSingleProperty}
        onHide={() => setShowModalSingleProperty(false)}
      >
        <Modal.Header closeButton>{/* <Modal.Title>Contact Info</Modal.Title> */}</Modal.Header>

        <Modal.Body>
          <h3 className='text-center my-lg-5'>
            <span style={{fontSize: '25px', color: 'grey'}}>Contact Info: </span>
            {propertySingleData !== null && +propertySingleData.phone}
          </h3>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Properties
