import "./App.css";
import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  age: number;
  email: string;
  phone: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  return (
    <>
      <SForm onSubmit={handleSubmit(onSubmit)}>
        <SLabel>
          名前<SSpan>必須</SSpan>
          <SInput
            type="text"
            {...register("name", {
              required: { value: true, message: "入力必須です" },
            })}
          />
          {errors.name && <SError>{errors.name.message}</SError>}
        </SLabel>
        <SLabel>
          年齢<SSpan>必須</SSpan>
          <SInput
            type="number"
            {...register("age", {
              required: { value: true, message: "入力必須です" },
              min: { value: 0, message: "最小値は0です" },
              max: { value: 140, message: "最大値は140です" },
            })}
          />
          {errors.age && <SError>{errors.age.message}</SError>}
        </SLabel>
        <SLabel>
          電話番号<SSpan>必須(ハイフンなしで入力してください)</SSpan>
          <SInput
            type="number"
            {...register("phone", {
              required: { value: true, message: "入力必須です" },
              pattern: {
                value: /^\d{10}$|^\d{11}$/,
                message: "正しい電話番号の形式で入力してください",
              },
            })}
          />
          {errors.phone && <SError>{errors.phone.message}</SError>}
        </SLabel>

        <SLabel>
          メールアドレス<SSpan>必須</SSpan>
          <SInput
            type="text"
            {...register("email", {
              required: { value: true, message: "入力必須です" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "正しいメールアドレスの形で入力してください",
              },
            })}
          />
          {errors.email && <SError>{errors.email.message}</SError>}
        </SLabel>
        <SButton>送信</SButton>
      </SForm>
    </>
  );
}

const SForm = styled.form`
  padding: 50px;
`;

const SLabel = styled.label`
  display: block;
  font-size: 30px;
  font-weight: bold;
  margin-right: 30px;
  margin-bottom: 30px;
`;

const SSpan = styled.span`
  font-size: 20px;
  color: red;
  margin-left: 10px;
`;

const SInput = styled.input`
  display: block;
  font-size: 30px;
  width: 400px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: 3px solid #ddd;
`;

const SButton = styled.button`
  font-size: 25px;
  width: 200px;
  padding: 10px;
  border: 3px solid #ddd;
  border-radius: 10px;
  margin-top: 30px;
`;

const SError = styled.p`
  font-size: 25px;
  color: red;
`;
