import React, { useEffect, useContext, useState } from "react";


import { Mensaje } from "../mensajes";
import { Loader, Dimmer } from "semantic-ui-react";
import moment from "moment";



import axios from "axios";
import useTable from "../useTable";
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { ModalImprimir } from "./modalImprimir";
import { ModalConsultarPoliza } from "./modalConsultarPoliza";
import { ModalRenovarPoliza } from "./modalRenovar";


function TablaContratosRealizados() {
  var op = require("../../modulos/datos");
  let token = localStorage.getItem("jwtToken");
  const user_id = JSON.parse(localStorage.getItem("user_id"));

  const [activate, setActivate] = useState(false);
  const [mensaje, setMensaje] = useState({
    mostrar: false,
    titulo: "",
    texto: "",
    icono: "",
  });

  console.log(user_id)
  const headCells = [
    { label: "N° Contrato", textAlign: "center", backgroundColor: '#e70101bf', color: 'white' },
    { label: "Fecha Vencimiento", textAlign: "center", backgroundColor: '#e70101bf', color: 'white' },
    { label: "C.I/R.I.F.", textAlign: "center", backgroundColor: '#e70101bf', color: 'white' },
    { label: "Benefeciario", textAlign: "center", backgroundColor: '#e70101bf', color: 'white' },
    { label: "Telefono", textAlign: "center", backgroundColor: '#e70101bf', color: 'white' },
    { label: "Placa", textAlign: "center", backgroundColor: '#e70101bf', color: 'white' },
    { label: "Acesor", textAlign: "center", backgroundColor: '#e70101bf', color: 'white' },
    { label: "Sucursal", textAlign: "center", backgroundColor: '#e70101bf', color: 'white' },
    { label: "Opciones", textAlign: "center", backgroundColor: '#e70101bf', color: 'white' },
  ];



  const codigo = JSON.parse(localStorage.getItem("codigo"));
  const permiso = JSON.parse(localStorage.getItem("permiso"));
  const [idCliente, setIdCliente] = useState();
  const [montoCuenta, setMontoCuenta] = useState();
  const [nCuenta, setNCuenta] = useState();
  const [total, setTotal] = useState(0.0);
  const [totalp, setTotalp] = useState(0.0);
  const [totalpresu, setTotalpresu] = useState(0.0);
  const [totaltipo, setTotaltipo] = useState(0.0);
  const [presupuesto, setPresupuesto] = useState(0.0);
  const [totalrc, setTotalrc] = useState(0.0);
  const [totalavi, setTotalavi] = useState(0.0);
  const [totalact, setTotalact] = useState(0.0);
  const [totalmenos, setTotalmenos] = useState(0.0);
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);
  const [mostrar3, setMostrar3] = useState(false);
  const [mostrar4, setMostrar4] = useState(false);



  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

  const [records, setRecords] = useState([
    {
      idproducto: "",
      codigo: "",
      cantidad: "",
      producto: "",
      precio: "",
      iva: "",
      motoiva: "",
      descuento: "",
      total: "",
    },
  ]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };


  const labels = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes ",
    "Sabado",
    "Domingo",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Miembros",
        data: [12, 4, 34, 54, 7, 12, 78],
        backgroundColor: "rgb(149, 187, 227)",
      },
    ],
  };
  const {
    TblContainer,
    TblHead,
    recordsAfterPagingAndSorting,
    TblPagination
  } = useTable(records, headCells, filterFn);


  const selecionarRegistros = async () => {
    let endpoint = op.conexion + "/poliza/ConsultarTodos";
    console.log(endpoint)
    setActivate(true)



    //setLoading(false);

    let bodyF = new FormData()

    bodyF.append("ID", user_id)


    await fetch(endpoint, {
      method: "POST",
      body: bodyF
    }).then(res => res.json())
      .then(response => {


        setActivate(false)
        console.log(response)
        setRecords(response)




      })
      .catch(error =>
        setMensaje({ mostrar: true, titulo: "Notificación", texto: error.res, icono: "informacion" })
      )

  };

  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
          return items;
        else
          return items.filter(x => {
            if ((x.poliza_id !== null ? String(x.poliza_id).includes(target.value) : 0)
              || (x.nombre !== null ? x.nombre.toLowerCase().includes(target.value.toLowerCase()) : '')
              || (x.cuentabancaria !== null ? x.cuentabancaria.includes(target.value) : '')
            ) {
              return x;
            }
          });
      }
    })

  }




  console.log('estas en menu')



  useEffect(() => {
    selecionarRegistros()

  }, []);

  const regPre = () => {
    setMostrar(true);
    setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" });
  };


  const gestionarBanco = (op, id) => (e) => {
    e.preventDefault();
    setIdCliente(id)
    if(op===3){
      setMostrar4(true)
    }else if(op===4){
      setMostrar2(true)
    } else if(op===5){
      setMostrar3(true)
    }

  }
  return (
    <div className="col-md-12 mx-auto p-2">

      <ModalImprimir
      show={mostrar2}
      onHideCancela={()=>{setMostrar2(false)}}
      idCliente={idCliente}

      />

      <ModalConsultarPoliza
       show={mostrar3}
       onHideCancela={()=>{setMostrar3(false)}}
       idCliente={idCliente}
      
 
       />

       <ModalRenovarPoliza
        show={mostrar4}
        onHideCancela={()=>{setMostrar4(false)}}
        idCliente={idCliente}
       
  
        />


      <div className="col-12 py-2">
        <div className='col-12 row d-flex justify-content-between py-2 mt-5 mb-3'>
          <h2 className=' col-5 text-light'>Lista De Contratos</h2>

        </div>

      </div>
      <div className="col-md-12 bg-light py-2 rounded" style={{ margin: "auto" }} >
        <div className="row col-12 d-flex justify-content-between mb-2">
          <input type="text" className=" col-3 form-control form-control-sm rounded-pill" onChange={handleSearch} placeholder="Buscar" />

          {/*<div className='col-3 d-flex justify-content-end'>
            <button onClick={gestionarBanco(1, '')} className="btn btn-sm btn-primary rounded-circle"><i className="fas fa-plus"></i> </button>
  </div>*/}
        </div>
        <TblContainer>
          <TblHead />
          <TableBody >
            {
              records && recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={index} style={{ padding: "0" }}>
                  <TableCell className='align-baseline' style={{ textAlign: "center", alignItems: 'center' }}>{item.poliza_id}</TableCell>
                  <TableCell className='align-baseline' style={{ textAlign: "center", alignItems: 'center' }}>
                    {formatDate(item.poliza_fechaVencimiento)}
                  </TableCell>
                  <TableCell className='align-baseline' style={{ textAlign: "center", alignItems: 'center' }}>{item.cliente_cedula}</TableCell>
                  <TableCell className='align-baseline' style={{ textAlign: "center", alignItems: 'center' }}>{item.cliente_nombre}</TableCell>
                  <TableCell className='align-baseline' style={{ textAlign: "center", alignItems: 'center' }}>{item.cliente_telefono}</TableCell>
                  <TableCell className='align-baseline' style={{ textAlign: "center", alignItems: 'center' }}>{item.vehiculo_placa}</TableCell>
                  <TableCell className='align-baseline' style={{ textAlign: "center", alignItems: 'center' }}>{item.usuario_nombre}</TableCell>
                  <TableCell className='align-baseline' style={{ textAlign: "center", alignItems: 'center' }}>{item.sucursal_nombre}</TableCell>
                  <TableCell className='align-baseline' style={{ textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button onClick={gestionarBanco(4, item.poliza_id)} className="btn btn-sm mx-1 btn-info rounded-circle"><i className="fas fa-print"></i> </button>
                    <button onClick={gestionarBanco(2, item.poliza_id)} className="btn btn-sm mx-1 btn-warning rounded-circle"><i className="fa fa-edit"></i> </button>
                    <button onClick={gestionarBanco(3, item.poliza_id)} className="btn btn-sm mx-1 btn-danger rounded-circle"><i className="fa fa-sync"></i> </button>
                    <button onClick={gestionarBanco(5, item.poliza_id)} className="btn btn-sm mx-1 btn-primary rounded-circle"><i className="fa fa-eye"></i> </button>
                  </TableCell>

                </TableRow>
              ))
            }
          </TableBody>
        </TblContainer>
        <TblPagination />
      </div>

      <Dimmer active={activate} inverted>
        <Loader inverted>cargando...</Loader>
      </Dimmer>
      <Mensaje
        mensaje={mensaje}
        onHide={() =>
          mensaje.texto ===
            "Este Usuario No posee preguntas de seguridad debe registrarlas"
            ? regPre()
            : setMensaje({ mostrar: false, titulo: "", texto: "", icono: "" })
        }
      />
    </div>
  );
}

export default TablaContratosRealizados;
const formatDate = (dateString) => {
  // Usa moment.js para formatear la fecha
  return moment(dateString).format("DD-MM-YYYY"); // Formato "día-mes-año"
};