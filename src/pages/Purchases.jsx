import { useContext, useEffect, useState } from "react";
import PurchaseModal from "../components/PurchaseModal";
import { getPurchaseService } from "../services/purchase.services";

import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../context/auth.context";

import { ThemeContext } from "../context/theme.context.js";

function Purchases() {
  const [historyPurchases, setHistoryPurchases] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const {loadingSpinner} = useContext(ThemeContext)

  useEffect(() => {
    purchaseHistory();
  }, []);

  const purchaseHistory = async () => {
    
    try {
      const response = await getPurchaseService();
      setHistoryPurchases(response.data);
      console.log()
      setIsFetching(false)
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) {
    if (isFetching) {
      return loadingSpinner()
  }
  }

  return (
    <div className="purchase-table-main">
    <h2>Historial de pedidos</h2>
      <table className="table-container">
        <thead >
          <tr className="thead-container">
          <th>Detalles del pedido</th>
            <th>Fecha</th>
            <th>Cantidad de productos</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {historyPurchases.map((eachPurchase) => {
            return (
              <tr key={eachPurchase._id}>
              <td>
                <PurchaseModal purchase={eachPurchase}/>
              </td>
                <td>
                  <strong>{new Intl.DateTimeFormat("es-ES", {
            dateStyle: "short",
          }).format(new Date(eachPurchase.createdAt))}</strong>
                </td>
                <td>{eachPurchase.items.length}</td>
                <td className="purchase-payment-state">Pagado</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default Purchases;
