import AuthInputs from "@/components/authInput/AuthInput";
import { VALIDATE } from "@/constants/constants";
import AuthLayout from "@/layouts/authLayout/AuthLayout";
import { axiosInstance } from "@/utils/axiosInstance";
import Head from "next/head";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

interface SignInProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setError,
  } = useForm<SignInProps>({ mode: "onBlur", reValidateMode: "onBlur" });

  const emailRegister = register("email", {
    required: {
      value: true,
      message: "이메일을 입력해 주세요.",
    },
    pattern: {
      value: VALIDATE.userEmail,
      message: "올바른 이메일 주소가 아닙니다.",
    },
  });

  const passwordRegister = register("password", {
    required: {
      value: true,
      message: "비밀번호를 입력해 주세요.",
    },
    pattern: {
      value: VALIDATE.userPassword,
      message: "비밀번호를 확인해 주세요.",
    },
  });
  const onSubmitHandler: SubmitHandler<SignInProps> = async () => {
    const values = getValues();
    try {
      const res = await axiosInstance.post("/sign-in", values);
      console.log(res);
      const { accessToken, refreshToken } = res.data.data;
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
      router.push("/folder/all");
    } catch (error) {
      setError("email", {
        message: "이메일을 확인해 주세요.",
      });
      setError("password", {
        message: "비밀번호를 확인해 주세요.",
      });
    }
  };

  return (
    <>
      <Head>
        <title>로그인 - Linkbrary</title>
      </Head>

      <AuthLayout handleSubmit={handleSubmit(onSubmitHandler)} mode="signin">
        <AuthInputs.AuthInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요."
          {...emailRegister}
          errors={errors}
          autoComplete="username"
        />
        <AuthInputs.PasswordInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          {...passwordRegister}
          errors={errors}
          autoComplete="current-password"
        />
        <AuthLayout.AuthButton>로그인</AuthLayout.AuthButton>
      </AuthLayout>
    </>
  );
};

export default SignIn;
