import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function Formulario() {
  const [material, setMaterial] = useState("");
  const [dije, setDije] = useState("");
  const [tipo, setTipo] = useState("");
  const [moneda, setMoneda] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);
  const [listaManillas, setListaManillas] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const data = collection(db, "manillas");
      const query = await getDocs(data);
      const items = query.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListaManillas(items);
    };
    obtenerDatos();
  }, []);

  const guardar = async (event) => {
    event.preventDefault();
    const data = collection(db, "manillas");
    let precio = 0;
    if (material === "Cuero" && dije === "Martillo" && (tipo === "Oro" || tipo === "Oro Rosado")) {
        precio = 100;
      } else if (material === "Cuero" && dije === "Martillo" && tipo === "Plata") {
        precio = 80;
      } else if (material === "Cuero" && dije === "Martillo" && tipo === "Niquel") {
        precio = 70;
      } else if (material === "Cuero" && dije === "Ancla" && (tipo === "Oro" || tipo === "Oro Rosado")) {
        precio = 120;
      } else if (material === "Cuero" && dije === "Ancla" && tipo === "Plata") {
        precio = 100;
      } else if (material === "Cuero" && dije === "Ancla" && tipo === "Niquel") {
        precio = 90;
      } else if (material === "Cuerda" && dije === "Martillo" && (tipo === "Oro" || tipo === "Oro Rosado")) {
        precio = 90;
      } else if (material === "Cuerda" && dije === "Martillo" && tipo === "Plata") {
        precio = 70;
      } else if (material === "Cuerda" && dije === "Martillo" && tipo === "Niquel") {
        precio = 50;
      } else if (material === "Cuerda" && dije === "Ancla" && (tipo === "Oro" || tipo === "Oro Rosado")) {
        precio = 110;
      } else if (material === "Cuerda" && dije === "Ancla" && tipo === "Plata") {
        precio = 90;
      } else if (material === "Cuerda" && dije === "Ancla" && tipo === "Niquel") {
        precio = 80;
      }
    if (moneda === "Pesos") {
      precio *= 5000;
    }
    const item = {
      dije,
      tipo,
      material,
      moneda,
      cantidad: parseInt(cantidad),
      precio: precio * parseInt(cantidad),
    };
    const docRef = await addDoc(data, item);
    setListaManillas([...listaManillas, { id: docRef.id, ...item }]);
    setDije("");
    setTipo("");
    setMaterial("");
    setMoneda("");
    setCantidad(1);
    setPrecio(precio * parseInt(cantidad));
  };

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">RUBRICA WEB 2</h1>
      <hr />
      <div className="row mt-5" >
        <div className="col-8" >
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Material</th>
                <th scope="col">Dije</th>
                <th scope="col">Tipo</th>
                <th scope="col">Moneda</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaManillas.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.material}</td>
                  <td>{item.dije}</td>
                  <td>{item.tipo}</td>
                  <td>{item.moneda}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.precio} {item.moneda}</td>
                  <td className="btnTable">
                    <button className="btn btn-success btn-md m-1">Editar</button>
                    <button className="btn btn-danger btn-md m-1">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-3">
          <h4 className="text-center">Agregar</h4>
          <form onSubmit={guardar}>
            <div className="form-group">
              <label htmlFor="material">Material</label>
              <select className="form-control" id="material" value={material} onChange={(e) => handleChange(e, setMaterial)}>
                <option value="">Selecciona una opción</option>
                <option value="Cuero">Cuero</option>
                <option value="Cuerda">Cuerda</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dije">Dije</label>
              <select className="form-control" id="dije" value={dije} onChange={(e) => handleChange(e, setDije)}>
                <option value="">Selecciona una opción</option>
                <option value="Martillo">Martillo</option>
                <option value="Ancla">Ancla</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tipo">Tipo</label>
              <select className="form-control" id="tipo" value={tipo} onChange={(e) => handleChange(e, setTipo)}>
                <option value="">Selecciona una opción</option>
                <option value="Oro">Oro</option>
                <option value="Baño de Oro">Baño De Oro</option>
                <option value="Oro Rosado">Oro Rosado</option>
                <option value="Plata">Plata</option>
                <option value="Niquel">Niquel</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="moneda">Moneda</label>
              <select className="form-control" id="moneda" value={moneda} onChange={(e) => handleChange(e, setMoneda)}>
                <option value="">Selecciona una opción</option>
                <option value="Dolares">Dolares</option>
                <option value="Pesos">Pesos</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="cantidad">Cantidad</label>
              <input type="number" className="form-control" id="cantidad" value={cantidad} onChange={(e) => handleChange(e, setCantidad)} min="1" />
            </div>
            <div className="container text-center">
              <button type="submit" className="btn btn-primary mb-3"> agregar</button> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Formulario;