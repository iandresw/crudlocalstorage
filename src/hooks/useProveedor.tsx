import { useState } from "react";
import Swal from "sweetalert2";
import {alertaError, alertaSuccess, alertaWarning} from "../Alertas.jsx"

const useProveedor=()=>{
    const [proveedores, setProveedores] = useState([])
    const [id, setId] = useState<number>(0)
    const [nombre, setNombre] = useState('')
    const [rubro, setRubro] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [contacto, setContacto] = useState('')
    const [tituloModal, setTituloModal] = useState('')
    const [operacion, setOperacion] = useState<number>(0)

    const getProveedores = () => {
        const localStorageProveedores = localStorage.getItem("PROVEEDORES")
        const parsedProveedores = localStorageProveedores ? JSON.parse(localStorageProveedores) : []
        return Array.isArray(parsedProveedores) ? parsedProveedores : []
    }

    const enviarSolicitus = (metodo, parametros = {})=>{
        const saveUpdateProveedores = [... proveedores]
        let mensaje = ''
        if (metodo==='POST'){
            saveUpdateProveedores.push({... parametros, id:Date.now()})
            mensaje="Proveedor Ingresado Correctamente"
        }else if  (metodo ==='PUT'){
            const proveedorIndex = saveUpdateProveedores.findIndex(proveedor => proveedor.id === parametros.id)
            if (proveedorIndex!== -1){
                saveUpdateProveedores[proveedorIndex]={... parametros}
                mensaje="Proveedor actualizado correctamente"
            }
        }else if  (metodo ==='DELETE'){
            const proveedorArr = saveUpdateProveedores.filter(proveedor => proveedor.id !== parametros.id)
            localStorage.setItem("PROVEEDORES", JSON.stringify(proveedorArr))
            alertaSuccess("Proveedor Eliminado Correctamente")
            setProveedores(proveedorArr)
            return
        }
        localStorage.setItem("PROVEEDORES", JSON.stringify(saveUpdateProveedores))
        setProveedores(saveUpdateProveedores)
        alertaSuccess(mensaje)
        document.getElementById('btnCerarModal').click()
    }

    const validar =()=>{
        let metodo =''
        if (nombre===""){
            alertaWarning("Nombre del proveedor en blanco", "nombre")
        }else if (rubro===""){
            alertaWarning("Descripcion del proveedor en blanco", "rubro")
        }else if (telefono===''){
            alertaWarning("Precio del proveedor en blanco", "telefono")
        }else if (correo===''){
            alertaWarning("Correo del proveedor en blanco", "correo")
        }else if (ubicacion===''){
            alertaWarning("Ubicacion del proveedor en blanco", "ubicacion")
        }else if (contacto===''){
            alertaWarning("Contacto del proveedor en blanco", "contacto")
        }else{
            let playload ={
                id: id || Date.now(),
                nombre: nombre,
                rubro:rubro,
                telefono:telefono,
                correo:correo,
                ubicacion:ubicacion,
                contacto:contacto
            }

            if (operacion ===1 ){
                metodo='POST'
            }else{
                metodo="PUT"
            }
            enviarSolicitus(metodo, playload)
        }
    }

    const deleteProveedor = (id) =>{
        Swal.fire({
            title:"¿Está seguro de eliminar el provvedor?",
            icon:"warning",
            text:"No Habra marcha atras",
            showCancelButton:true,
            confirmButtonText:"Si, eliminar",
            cancelButtonText:"Cancelar"
        }).then((result) =>{
            if (result.isConfirmed){
                enviarSolicitus('DELETE',{id})     
            }
        }).catch((error)=>{
            alertaError(error)
        })
    }

    const openModal = (valorOperacion, proveedor={})=>{
        if (valorOperacion===1){
            setTituloModal("Registar Proveedor")
            setId(0)
            setNombre('')
            setRubro("")
            setTelefono("")
            setCorreo("")
            setUbicacion("")
            setContacto("")
            setOperacion(1)
        } else if (valorOperacion===2){
            setTituloModal("Editar Proveedor")
            setId(proveedor.id)
            setNombre(proveedor.nombre)
            setRubro(proveedor.rubro)
            setTelefono(proveedor.telefono)
            setCorreo(proveedor.correo)
            setUbicacion(proveedor.ubicacion)
            setContacto(proveedor.contacto)
            setOperacion(2)
        }
    }

    return{
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
    }
}
export default useProveedor