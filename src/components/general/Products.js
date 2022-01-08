import React from 'react'
import { Card, Button } from 'antd';
import propTypes  from 'prop-types'
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Products = ({
    product,
    description, 
    uploadImages, 
    link,
    showBtn
    }) => {
    return (
        <div style={{display:"flex"}}>
            <Link to={link || ""}>
                <Card
                    hoverable
                    style={{ width: 400 }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                >
                    <Meta
                        title={product.name}
                        description={description}
                    />
                    {showBtn && <Link className='btn btn-primary' to={uploadImages || ""}>Add Images</Link>}
                </Card>,
            </Link>
        </div>
    )
}

Products.propTypes={
    Product: propTypes.object.isRequired,
    description: propTypes.func.isRequired,
    buttonName: propTypes.string
}

export default Products
