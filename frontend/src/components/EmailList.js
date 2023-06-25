import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h1,
  h2 {
    margin-left: 16px;
    margin-bottom: 24px;
    color: white;
  }
`;
const InputFieldWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #f7f7f7;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

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

const Row = styled.form`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  margin-left: 16px;
`;

const CoolButton = styled.button`
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

const EmailHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: white;
`;
function EmailList() {
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch("/api/emails")
      .then((res) => res.json())
      .then((data) => setEmails(data))
      .catch((error) => console.log(error));
  }, [subscribed]);

  function Submit(event) {
    event.preventDefault();

    fetch("/api/add-email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Name: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Email submitted successfully");
          setSubscribed(true);
        } else {
          alert("There was an error submitting your email");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <Wrapper>
      <h1>Let us keep you updated!</h1>
      {!subscribed && (
        <Row onSubmit={Submit}>
          <InputFieldWrapper>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label>{email ? "" : "Enter email"}</Label>
          </InputFieldWrapper>
          <CoolButton>Subscriber </CoolButton>
        </Row>
      )}
      {subscribed && <h2>You have successfully subscribed!</h2>}
      <EmailHolder>
        {emails.map((email, index) => (
          <div key={index}>{email.name}</div>
        ))}
      </EmailHolder>
    </Wrapper>
  );
}

export default EmailList;
