import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from "../../assets/assets"

export const ExploreMenu = ({ category,setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>探索我们的菜单</h1>
            <p className='explore-menu-text'>琳琅满目的菜单，琳琅满目的菜肴，任您选择。<br />我们的使命是满足您的味蕾，提升您的用餐体验，让您每次都能享用到美味佳肴。</p>
            <div className="explore-ment-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />

        </div>
    )
}