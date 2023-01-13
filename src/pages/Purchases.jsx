import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PurchaseModal from "../components/PurchaseModal";
import { getPurchaseService } from "../services/purchase.services";

//Custom Hook
import { useFetching } from "../hooks/useFetching";
import LoadingSpinner from "../components/LodingSpinner";
import SEO from "../components/SEO";

function Purchases() {

   //CustomHook
   const {disableFetching, showIsFetching} = useFetching()

  const navigate = useNavigate();

  const [historyPurchases, setHistoryPurchases] = useState();


  useEffect(() => {
    purchaseHistory();
  }, []);

  // Gets the purchases list
  const purchaseHistory = async () => {
    try {
      const response = await getPurchaseService();
      const copyResponse = [...response.data];
      copyResponse.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setHistoryPurchases(copyResponse);
      disableFetching();
    } catch (error) {
      navigate("/error");
    }
  };

  if (showIsFetching()) {
    return <LoadingSpinner/>;
  }
  
  return (
    <div className="purchase-table-main">
            <SEO
        title="Purchases | Taste it"
        description="List of purchases"
      />
      <h2>Historial de pedidos</h2>
      <table className="table-container">
        <thead>
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
                  <PurchaseModal purchase={eachPurchase} />
                </td>
                <td>
                  <strong>
                    {new Intl.DateTimeFormat("es-ES", {
                      dateStyle: "short",
                    }).format(new Date(eachPurchase.createdAt))}
                  </strong>
                </td>
                <td>{eachPurchase.items.length}</td>
                <td className="purchase-payment-state">Pagado</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default Purchases;
