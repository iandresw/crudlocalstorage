import { useEffect } from "react"
import useProveedor from "../hooks/useProveedor"
import Entrada from "./entradas"

const Proveedor= () =>{


    const {
               proveedores,
        setProveedores,
        getProveedores,
        tituloModal,
        setTituloModal,
        id,
        setId,
        nombre, setNombre,
        rubro, setRubro,
        telefono, setTelefono,
        correo,setCorreo,
        ubicacion, setUbicacion,
        contacto, setContacto,
        openModal,
        validar,
        deleteProveedor
    } = useProveedor()
useEffect(() => {
    setProveedores(getProveedores())
}, [])
  return (
    <div className="container-fluid">
<div className="row mt-2">
  <div className="col-12 text-center">
    <button className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#modalProveedor"
      onClick={() => openModal(1)}>
      <i className="fa-solid fa-circle-plus"></i> Añadir
    </button>
  </div>
</div>
        <div className="col-12 col-lg-12  mt-3">
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                       <tr>
                            <th>No.</th>
                            <th>Nombre</th>
                            <th>Rubro</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Ubicacion</th>
                            <th>Contacto</th>
                            <th>Acciones</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            proveedores.map((proveedor, i)=>(
                                <tr key={proveedor.id}>
                                    <td>{i+1}</td>
                                    <td>{proveedor.nombre}</td>
                                    <td>{proveedor.rubro}</td>
                                    <td>{proveedor.telefono}</td>
                                    <td>{proveedor.correo}</td>
                                    <td>{proveedor.ubicacion}</td>
                                    <td>{proveedor.contacto}</td>
                                    <td>
                                        <button className="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#modalProveedor" onClick={() => openModal(2, proveedor)}>
                                            <i className="fa-solid fa-edit"></i>
                                        </button>
                                        <button className="btn btn-danger mx-2" onClick={()=>deleteProveedor( proveedor.id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div id='modalProveedor' className="modal fade" aria-hidden="true" tabIndex={-1}>
        <div className="modal-dialog">
                    <div className="modal-content">
                <div className="modal-header">
                    <label className="h5">{tituloModal}</label>
                </div>
                <div className="modal-body">
                 <Entrada id={"nombre"}  iconName={"fa-solid fa-gift"}  inputType={"text"}  placeholder={"Nombre Proveedor"}   onChange={(e)=>setNombre(e.target.value)}  value={nombre}></Entrada>
                 <Entrada id={"rubro"} iconName={"fa-solid fa-comment"} inputType={"text"} placeholder={"Rurbo del proveedor"} onChange={(e)=>setRubro(e.target.value)} value={rubro}></Entrada>
                 <Entrada id={"telefono"} iconName={"fa-solid fa-phone"} inputType={"text"} placeholder={"Telefono del proveedor"} onChange={(e)=>setTelefono(e.target.value)} value={telefono}></Entrada>
                 <Entrada id={"correo"} iconName={"fa-solid fa-envelope"} inputType={"text"} placeholder={"Correo del proveedor"} onChange={(e)=>setCorreo(e.target.value)} value={correo}></Entrada>
                 <Entrada id={"ubicacion"} iconName={"fa-solid fa-shop"} inputType={"text"} placeholder={"Ubicacion del proveedor"} onChange={(e)=>setUbicacion(e.target.value)} value={ubicacion}></Entrada>
                <Entrada id={"contacto"} iconName={"fa-solid fa-user"} inputType={"text"} placeholder={"Contacto del proveedor"} onChange={(e)=>setContacto(e.target.value)} value={contacto}></Entrada>
               
                </div>
                <div className="modal-footer">
                   <button className="btn btn-success" onClick={()=>validar()}>
                    <i className="fa-solid fa-floppy-disk" ></i> Guardar
                   </button>
                   <button id='btnCerarModal' className="btn btn-danger" data-bs-dismiss="modal">
                    <i className="fa-solid fa-circle-xmark"></i> Cerrar
                   </button>
                </div>
            </div>
        </div>
        </div>
   </div>
  )
}

export default Proveedor