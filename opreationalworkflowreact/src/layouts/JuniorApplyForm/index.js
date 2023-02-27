/* eslint-disable no-unused-vars */
/**
=========================================================
* Operational Workflow Management MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Operational Workflow Management MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout1";
import DashboardNavbar from "examples/Navbars/NavbarJunior";
import Footer from "examples/Footer";

// Operational Workflow Management MUI base styles
import { useState } from "react";

import ArgonBox from "components/ArgonBox";

// Operational Workflow Management MUI components
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import axios from "axios";
import { ipofserver } from 'global';
import Form from 'react-bootstrap/Form';

function Default() {

  const [selectedValue, setSelectedValue] = useState('');

  const [formData, setFormData] = useState([])

  const handleChange = e => {
    setSelectedValue('Leave');
    formData.map((lst, id) => {
      var inputtype = lst.replace(/['"]+/g, '')
      if (inputtype.split('&&')[0] == ' Input') {
        document.getElementById("Input" + id).value = ''
      }
      else if (inputtype.split('&&')[0] == ' Select') {
        // var value = document.getElementById("Select"+id).value;
        document.getElementById("Select" + id).selectedIndex = "0";
      }
    })
    Welcome('Leave')
  }
  const handleChange1 = e => {
    setSelectedValue('Promotion');
    formData.map((lst, id) => {
      var inputtype = lst.replace(/['"]+/g, '')
      if (inputtype.split('&&')[0] == ' Input') {
        document.getElementById("Input" + id).value = ''
      }
      else if (inputtype.split('&&')[0] == ' Select') {
        // var value = document.getElementById("Select"+id).value;
        document.getElementById("Select" + id).selectedIndex = "0";
      }
    })
    Welcome('Promotion')
  }
  const handleChange2 = e => {
    setSelectedValue('Appraisal');
    formData.map((lst, id) => {
      var inputtype = lst.replace(/['"]+/g, '')
      if (inputtype.split('&&')[0] == ' Input') {
        document.getElementById("Input" + id).value = ''
      }
      else if (inputtype.split('&&')[0] == ' Select') {
        // var value = document.getElementById("Select"+id).value;
        document.getElementById("Select" + id).selectedIndex = "0";
      }
    })
    Welcome('Appraisal')
  }

  function Welcome(valueff) {
    axios.get(ipofserver + 'loadForms/' + valueff)
      .then(res => {
        // var result = lst.substring(1, lst.length-1)
        if (res.data.length == 0) {
          setFormData(['&&No form available'])
        }
        else {
          var lst = res.data[0][1]
          var result = lst.substring(1, lst.length - 1)
          setFormData(result.split(','))
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const submitButton = () => {
    var finallst = []
    formData.map((lst, id) => {
      var inputtype = lst.replace(/['"]+/g, '')
      if (inputtype.split('&&')[0] == ' Input') {
        var x = document.getElementById("Input" + id).value;
        finallst.push(x)
      }
      else if (inputtype.split('&&')[0] == ' Select') {
        var value = document.getElementById("Select" + id).value;
        finallst.push(value)
      }
    })
    console.log(finallst)
    var bool = true
    finallst.map((ele, id) => {
      if (ele == '') {
        bool = false
      }
    })
    if (!bool) {
      alert("Please enter details!")
    }
    else {
      axios.post(ipofserver + 'UserApplyForm', {
        username: localStorage.getItem('LoginUsername'),
        usertype: localStorage.getItem('LoginUsertype'),
        listofinputs: finallst,
        checks: document.getElementById("Checkbox").value,
        typeofform : selectedValue
      })
        .then(function (response) {
          if (response.data == "success") {
            alert("Form apply completed !")
          }
          else {
            alert("Your request is already under !")
          }
        })
        .catch(function (error) {
          return error;
        });
    }
    // var x = document.getElementById("Input1").value;
    // alert(x)
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox p={3} mt={5} mb={5} style={{ backgroundColor: 'white', position: 'relative', borderRadius: 10 }}>
        <div className="d-flex justify-content-between">
          <h2 className='mb-3'>{"Selected type : " + selectedValue}</h2>
          {/* <Select className="select" styles={styles} options={options} onChange={handleChange}
            value={options.find(obj => obj.value === selectedValue)} /> */}
          <div>
            <ArgonButton color="info" size="large" onClick={handleChange} style={{ width: '150px', fontSize: '17px' }}>
              Leave
            </ArgonButton>
            <ArgonButton color="info" size="large" onClick={handleChange1} style={{ width: '150px', marginLeft: '20px', fontSize: '17px' }}>
              Promotion
            </ArgonButton>
            <ArgonButton color="info" size="large" onClick={handleChange2} style={{ width: '150px', marginLeft: '20px', fontSize: '17px' }}>
              Appraisal
            </ArgonButton>
          </div>
        </div>
        <ArgonBox component="form" role="form" mt={3}>
          {formData.map((someStr, id) => {
            var data = someStr.replace(/['"]+/g, '')
            // alert(data.split('&&')[0])
            if (data.split('&&')[0] == ' Input') {
              return <ArgonBox mb={2} key={id}>
                <ArgonInput type="text" size="large" placeholder={data.split('&&')[1]} name="username" id={"Input" + id} />
              </ArgonBox>
            }
            else if (data.split('&&')[0] == ' Select') {
              var list = data.split('&&')[1].split('-')
              return <ArgonBox mb={2}>
                <Form.Select id={"Select" + id}>
                  {list.map((option1, id) => {
                    return <option value={option1} key="id">{option1}</option>
                  })}
                </Form.Select>
              </ArgonBox>
            }
            else if (data.split('&&')[0] == ' Checkbox') {
              return <input type="hidden" size="large" value={data.split('&&')[1]} name="username" id={"Checkbox"} />
              // <ArgonBox mb={2}>
              //   {/* <input type="checkbox" id={"Select" + id} /> <label>{data.split('&&')[1]}</label> */}                
              //   <ArgonInput type="text" size="large" placeholder={data.split('&&')[1]} name="username" id={"Input" + id} />
              // </ArgonBox>
            }
            else {
              return <ArgonBox mb={2} key={id}><h4>{data.split('&&')[1]}</h4></ArgonBox>
            }
          })}
          <ArgonBox mt={4} mb={1}>
            <ArgonButton color="info" size="large" style={{ fontSize: '16px' }} onClick={submitButton} fullWidth>
              Apply for {selectedValue}
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
