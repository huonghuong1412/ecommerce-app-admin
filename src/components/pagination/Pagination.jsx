import React from 'react'

export default function Pagination(props) {
    const {data, pages, currPage} = props;

    const selectPage = (page) => {
        console.log(page);
    }

    return (
        <div>
            {
                pages > 1 ? (
                    <div className="table__pagination">
                        {
                            data.map((item, index) => (
                                <div key={index} className={`table__pagination-item ${currPage === index ? 'active' : ''}`} onClick={() => selectPage(index)}>
                                    {item + 1}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}
