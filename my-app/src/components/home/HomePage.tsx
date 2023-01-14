import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import http from "../../http_common";
import { GetProductAction, IProductItem, IProductResponse, IProductState, ProductActionTypes } from "./types";
const HomePage = () => {
  //const [list, setList] = useState<Array<IProductItem>>([]);
  const { list, total, count_page } = useSelector((state: any) => state.product as IProductState);
  const dispatch = useDispatch();

  useEffect(() => {
    http.get<IProductResponse>("/api/products").then((resp) => {
      console.log("List product server", resp);
      const {data} = resp;

      const payload: IProductState = {
        list: data.data,
        count_page: data.last_page,
        current_page: data.current_page,
        total: data.total
      };

      const action: GetProductAction = {
        type: ProductActionTypes.GET_PRODUCTS,
        payload: payload
      };

      dispatch(action);
    });
  }, []);

  const data = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
    </tr>
  ));

  const buttons: Array<number> = [];
  for (let i = 1; i <= count_page; i++) {
    buttons.push(i);
  }

  const pagination = buttons.map(page => {
    return (
      <li key={page} className="page-item">
        <Link to={"?page="+page} className="page-link">{page}</Link>
      </li>
    );
  });

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <h4>Всього записів <strong>{total}</strong></h4>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
      <nav>
        <ul className="pagination">
          {pagination}
        </ul>
      </nav>
    </>
  );
};

export default HomePage;
