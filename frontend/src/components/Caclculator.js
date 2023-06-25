import React, { useEffect, useRef, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Loader from "./Loader";
import styled from "styled-components";

const InputFieldWrapper = styled.div`
  position: relative;
`;

const Mealsholder = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 16px;
  color: rgba(0, 0, 0, 0);
  div {
    display: none;
  }
  h1 {
    margin-top: 32px;
    color: black;
  }
  :before {
    display: none;
  }
  :after {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 32px;
  margin-bottom: 32px;
`;
const Input = styled.input`
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  min-width: 200px;
  background-color: #f7f7f7;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0);
  &:focus {
    outline: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  transition: top 0.3s ease, font-size 0.3s ease, color 0.3s ease;
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
  div {
    color: white;
    /* margin-bottom: 8px; */
  }
`;

const CoolButton = styled.button`
  margin: 0 50%;
  margin-top: 32px;
  cursor: pointer;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #3bb0b7;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.3s ease;
  min-width: max-content;
  &:hover {
    background-color: #4bc5cc;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  &:active {
    background-color: #3aa2a9;
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const Calculator = () => {
  const configuration = new Configuration({
    organization: "org-YwA9Og336yUTL0gZrd7jW5f0",
    apiKey: "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",
  });

  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(1);
  const [protein, setProtein] = useState(null);
  const [proteinError, setProteinError] = useState("Enter protein amount");
  const [carbs, setCarbs] = useState(null);
  const [carbsError, setCarbsError] = useState("Enter carbs amount");
  const [fats, setFats] = useState(null);
  const [fatsError, setFatsError] = useState("Enter fats amount");

  const inputRef = useRef([]);

  const handleSendMessage = async (number, protein, carbs, fats) => {
    const openai = new OpenAIApi(configuration);
    // setMessages((prevMessages) => [...prevMessages, { text, sender: "user" }]);
    setLoading(true);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      //   model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content:
            "You are nutrient table generator, you are using European mesurment system and you are replying only with tables",
        },
        {
          role: "user",
          content: `Generate ${number} meals plans, total carb intake for all these meals shouldn't surpass ${carbs}g, total protein intake shouldn't surpass ${protein}g intake and total fat intake shouldn't surpass ${fats}g. Each meal should be in seperated HTML table in format like this: <table>
            <caption><h1>Meal Plan X</h1></caption>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Carbs</th>
                <th>Proteins</th>
                <th>Fats</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Oatmeal</td>
                <td>20g</td>
                <td>5g</td>
                <td>2g</td>
                <td>100g</td>
              </tr>
              <tr>
                <td>Chicken Salad</td>
                <td>10g</td>
                <td>20g</td>
                <td>8g</td>
                <td>100g</td>
              </tr>
              <tr>
                <td>Grilled Salmon</td>
                <td>0g</td>
                <td>25g</td>
                <td>10g</td>
                <td>100g</td>
              </tr>
              <tr>
              <td>Total</td>
              <td>30g</td>
              <td>50g</td>
              <td>20g</td>
              <td>x</td>
            </tr>
              <!-- Add more rows for other meals -->
            </tbody>
          </table> 
          <!--After meal tables -->
          <table>
            <tbody> 
                <td>Grand total</td>   
                <td>30g</td>
                <td>50g</td>
                <td>20g</td>
                <td>x</td>
            </tbody>
          </table> 
          `,
        },
      ],
    });
    setLoading(false);

    console.log(completion.data.choices[0].message);
    setMessages(completion.data.choices[0].message);
  };

  const Generate = async () => {
    if (!protein) {
      setProteinError("Please set amount!");
    }

    if (!carbs) {
      setCarbsError("Please set amount!");
    }

    if (!fats) {
      setFatsError("Please set amount!");
    }
    if (number && protein && carbs && fats) {
      handleSendMessage(number, protein, carbs, fats);
    }
  };

  useEffect(() => {}, [messages]);

  const handleClick = (input) => {
    const length = input.value.length;
    if (length > 0) {
      input.setSelectionRange(length - 1, length - 1);
    }
  };

  const handleKeyDown = (event, input) => {
    if (event.key === "Backspace") {
      const length = input.value.length;

      if (input.selectionStart === length && input.selectionEnd === length) {
        event.preventDefault();
        if (length > 0) {
          input.setSelectionRange(length - 1, length - 1);
        }
      }
    }
  };

  return (
    <Wrapper>
      <Column>
        <Row>
          <InputHolder>
            <div>Number of meals</div>

            <InputFieldWrapper>
              <Input
                type="number"
                value={number}
                min={1}
                max={10}
                onChange={(e) => setNumber(e.target.value)}
              />
              <Label>{number ? "" : "Enter meal number"}</Label>
            </InputFieldWrapper>
          </InputHolder>
          <InputHolder>
            <div>Proteins</div>

            <InputFieldWrapper>
              <Input
                type="text"
                ref={(el) => (inputRef.current[0] = el)}
                value={protein ? protein + "g" : ""}
                onChange={(e) => setProtein(e.target.value.replace(/\D/g, ""))}
                onClick={() => handleClick(inputRef.current[0])}
                onKeyDown={(e) => handleKeyDown(e, inputRef.current[0])}
              />
              <Label>{protein ? "" : proteinError}</Label>
            </InputFieldWrapper>
          </InputHolder>
          <InputHolder>
            <div>Carbs</div>

            <InputFieldWrapper>
              <Input
                type="text"
                value={carbs ? carbs + "g" : ""}
                onChange={(e) => setCarbs(e.target.value.replace(/\D/g, ""))}
                ref={(el) => (inputRef.current[1] = el)}
                onClick={() => handleClick(inputRef.current[1])}
                onKeyDown={(e) => handleKeyDown(e, inputRef.current[1])}
              />
              <Label>{carbs ? "" : carbsError}</Label>
            </InputFieldWrapper>
          </InputHolder>
          <InputHolder>
            <div>Fats</div>
            <InputFieldWrapper>
              <Input
                type="text"
                value={fats ? fats + "g" : ""}
                onChange={(e) => setFats(e.target.value.replace(/\D/g, ""))}
                ref={(el) => (inputRef.current[2] = el)}
                onClick={() => handleClick(inputRef.current[2])}
                onKeyDown={(e) => handleKeyDown(e, inputRef.current[2])}
              />
              <Label>{fats ? "" : fatsError}</Label>
            </InputFieldWrapper>
          </InputHolder>
        </Row>
        {!messages && !loading && (
          <CoolButton onClick={() => Generate()}>Generate Meal Plan</CoolButton>
        )}
        {messages && (
          <Mealsholder
            id="mealPlans"
            dangerouslySetInnerHTML={{ __html: messages.content }}
          ></Mealsholder>
        )}
        {loading && <Loader />}
      </Column>
    </Wrapper>
  );
};

export default Calculator;
