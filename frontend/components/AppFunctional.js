import axios from 'axios';
import React, { useState } from 'react'

// önerilen başlangıç stateleri
let initialValues = {
Message: '',
Email: '',
Steps: 0,
Index: 4 
}//  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const coordinates = {
  0: [1,1],
  1: [2,1],
  2: [3,1],
  3: [1,2], 
  4: [2,2], 
  5: [3,2],
  6: [1,3], 
  7: [2,3], 
  8: [3,3],
  }
  const [formData, setFormData] = useState(initialValues);

  let postValues = {
    x: coordinates[formData.Index][0],
    y: coordinates[formData.Index][1],
    steps: formData.Steps,
    email: formData.Email,
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setFormData(initialValues);
  }

  function sonrakiIndex(direction) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    const { Index, Steps } = formData;
    let newIndex = Index;
    let newSteps = Steps;
    let message = "";

    switch (direction) {
      case 'left':
        if (coordinates[Index][0] > 1) {
          newIndex = Index - 1;
          newSteps += 1;
        } else {
          message = "Sola gidemezsiniz"
        }
        break;
      case 'right':
        if (coordinates[Index][0] < 3) {
          newIndex = Index + 1;
          newSteps += 1;
        }else {
          message = "Sağa gidemezsiniz"
        }
        break;
      case 'up':
        if (coordinates[Index][1] > 1) {
          newIndex = Index - 3;
          newSteps += 1;
        }else {
          message = "Yukarıya gidemezsiniz"
        }
        break;
      case 'down':
        if (coordinates[Index][1] < 3) {
          newIndex = Index + 3;
          newSteps += 1;
        }else {
          message = "Aşağıya gidemezsiniz"
        }
        break;
      default:
        break;
    }

    setFormData({ ...formData, Index: newIndex, Steps: newSteps, Message: message });
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    const {name, value} = evt.target;
    setFormData({...formData, [name]:value});
  }

  function onSubmit(event) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    event.preventDefault();
    axios.post("http://localhost:9000/api/result", postValues)
    .then((response)=>setFormData({...formData, Message: response.data.message, Email:""}))
    .catch((error)=>setFormData({...formData, Message: error.response.data.message, Email:""}));
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({coordinates[formData.Index][0]}, {coordinates[formData.Index][1]})</h3>
        <h3 id="steps">{formData.Steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === formData.Index ? ' active' : ''}`}>
              {idx === formData.Index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{formData.Message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => sonrakiIndex('left')}>SOL</button>
        <button id="up" onClick={() => sonrakiIndex('up')}>YUKARI</button>
        <button id="right" onClick={() => sonrakiIndex('right')}>SAĞ</button>
        <button id="down" onClick={() => sonrakiIndex('down')}>AŞAĞI</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}> 
        <input id="email" type="email" placeholder="email girin" name="Email" onChange={onChange} value={formData.Email}></input>
        <input id="submit" type="submit" ></input>
      </form>
    </div>
  )
}
