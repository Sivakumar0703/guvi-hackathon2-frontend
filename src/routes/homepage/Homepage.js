import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/layout';
import axios from 'axios'
import Loading from '../../components/loading/loading';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Viewproduct from './Viewproduct';
import { DatePicker, Space, TimePicker } from 'antd'; 
import moment from 'moment';
import dayjs from 'dayjs';
import { ProductContext } from '../../components/context/Context';
import { Container, Row, Col } from 'react-bootstrap';



const HomePage = () => {

    const [product, setProduct] = useState();
    const [productCopy, setProductcopy] = useState();// for filter
    const [loading, setLoading] = useState(true); // for loading 
    const [search, setSearch] = useState('');  // for search bar
    const {url} = useContext(ProductContext);
    // states for date and time
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();
    const format = 'HH:mm';




    // date and time picker functionality
    function getTime(moment, timeRange) {
        setFromTime(timeRange[0]);
        setToTime(timeRange[1]);
    }


    function filterByDate(dates) {
        dates && setStartDate(moment(dates[0].$d).format('YYYY-MM-DD'));
        dates && setEndDate(moment(dates[1].$d).format('YYYY-MM-DD'));
    }

    // search filter function
    function filterbycategory(filterdata) {
        if (filterdata !== 'all') {
            console.log(filterdata , 'selected')
            const filtered = productCopy.filter((item) => item.type.toLowerCase() === filterdata.toLowerCase())
            setProduct(filtered)
        } else {
            setProduct(productCopy)
        }
    }

    useEffect(() => {

        async function getData() {
            try {
                const data = (await axios.get(`${url}/products`)).data
                setProduct(data.products)
                setProductcopy(data.products)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        getData();
    }, [])

    let current_date = new Date();
    let date = current_date.getDate(); // 2,5,10,15...
    let month = current_date.getMonth() + 1; // 6,7,10,12
    let year = current_date.getUTCFullYear(); // 2023

    if (month < 10) {
        month = "0" + month; // 03,04,05...
    }
    if (date < 10) {
        date = "0" + date; // 02,03,07
    }

    let minDate = `${date}-${month}-${year}`; // yyyy-mm-dd
    let currentDate = `${year}-${month}-${date}`; // for date picker



    return (
        <Layout>

            <div className='homepage'>

                <div className='row'>
                    <div className='col-md-10 data-time m-3'>
                        <Space className="date_time" direction="horizontal" size={26}>
                            <h5>Select Date</h5> <DatePicker.RangePicker format='DD-MM-YYYY' onChange={filterByDate}
                                disabledDate={d => !d || d.isBefore(currentDate)
                                }
                            />
                            <h5>Select Time</h5> <TimePicker.RangePicker defaultValue={dayjs('00:00', format)} format={format} onChange={getTime}
                            //minuteStep={30}
                            />
                        </Space>
                    </div>
                </div>
                <hr />

                {/* search bar */}
                <div className='search-div'>
                    {/* search filter */}
                    <div className='search-box'>
                        <input className="form-control me-2 input-search-box" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} /> &nbsp; &nbsp;
                    </div>

                    <div className='filter'>
                        <span> <FilterAltIcon className='filter-icon' /> </span> &nbsp; <select className="category" onChange={(e) => filterbycategory(e.target.value)}>
                            <option value='all'>All</option>
                            <option value='furniture'> Furniture</option>
                            <option value='electronics'>Electronics</option>
                            <option value='appliances'>Electrics</option>
                            <option value='studio'>Studio</option>
                        </select>
                    </div>
                </div>
                <hr />

        

                    <Container fluid>
                        <Row>
                            <Col className='main-div'>
                                {loading ? <h1><Loading /></h1> : (product && product.filter(item => {
                                    if (search === '') {
                                        return item
                                    } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
                                        return item
                                    }
                                }
                                )
                                    .map((item) => {

                                        return (
                                            <Viewproduct item={item} from={fromTime} to={toTime} startdate={startDate} enddate={endDate} key={item._id} minDate={minDate} className='allCard' />
                                        )
                                    })
                                )}
                            </Col>
                        </Row>
                    </Container>
      
            </div> </Layout>
    )
}

export default HomePage





