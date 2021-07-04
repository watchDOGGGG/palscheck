import React,{useState,useEffect} from 'react'
import { CommentOutlined} from '@ant-design/icons';
import '../../Layout/layout.css'
import TrendingList from './trendingList'

const SeverLink = 'http://localhost:4000'
const Trendings =()=>{

    const [data,setData] = useState([])

    useEffect(() => {
            getData()
       
    })

      const getData = async()=>{
        const fetchAll = await fetch(`${SeverLink}/Talk/`,{
            headers:{token:localStorage.token}
        })
        const response = await fetchAll.json()
        if(response.talks){
            setData(response.talks)
        }
    }

    return (
            <section class="">
                <article class="br4 pa4 mw6 center newfeed--3-art br4 pa2">
                    <div className="">
                    <center orientation="left"><span className="f-name tl f5 b fw6 mb4">Talks you join</span>&nbsp;<span className="tr"><CommentOutlined /></span></center>
                        {/* <a href="" class="f6 no-underline underline-hover blue dib v-mid mb0">Edit</a> */}
                    </div>
                    {
                        data.length > 0 ?
                            data.map((element, i) => {
                                return (
                                    <>
                                    <ul class="list f6 pl0 mt3 mb0">
                                        <TrendingList 
                                        id={element._id}
                                        address={element.address}
                                        user={element.user}
                                        />
                                    </ul>
                                    <hr/>
                                    </>
                                )
                            })
                            : null
                    }
                </article>
            </section>
    )
}
export default Trendings