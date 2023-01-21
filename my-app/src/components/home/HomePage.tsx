import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import http from "../../http_common";
import Pagination from "../common/Pagination";
import { GetProductAction, IProductItem, IProductResponse, IProductState, ProductActionTypes } from "./types";
const HomePage = () => {
  //const [list, setList] = useState<Array<IProductItem>>([]);
  const { list, total, count_page, current_page } = useSelector((state: any) => state.product as IProductState);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page")?? 1;
    http.get<IProductResponse>("/api/products?page="+page).then((resp) => {
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
  }, [searchParams]);

  const data = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.detail}</td>
    </tr>
  ));

  const handleClickPage = (page: number) => {
    setSearchParams("page="+page);
    console.log("Click, number", page);
  }

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <h4>
        Всього записів <strong>{total}</strong>
      </h4>
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

      <Pagination
        count_page={count_page}
        current_page={current_page}
        onHandleClick={handleClickPage}
      />
    </>
  );
};

export default HomePage;
