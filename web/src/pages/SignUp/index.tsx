import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signUp } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Insira um email válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Senha com no mínimo 6 dígitos'),
          confirmPassword: Yup.string()
            .required('Confirme sua senha')
            .oneOf([Yup.ref('password')], 'Senhas devem ser iguais'),
        });

        // Validate data
        await schema.validate(data, { abortEarly: false });

        // Signup to database
        await signUp({
          name: data.name,
          email: data.email,
          password: data.password,
        });

        // Show toast message
        addToast({
          title: 'Sucesso na criação de usuário',
          type: 'success',
        });

        // Redirect to login page
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        // Show toast message
        addToast({
          title: 'Erro na criação de usuário',
          type: 'error',
          description:
            'Ocorreu um erro ao realizar seu cadastro, Tente novamente.',
        });
      }
    },
    [addToast, signUp, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input icon={FiUser} placeholder="Nome" name="name" />
            <Input icon={FiMail} placeholder="E-mail" name="email" />
            <Input
              icon={FiLock}
              type="password"
              placeholder="Senha"
              name="password"
            />
            <Input
              icon={FiLock}
              type="password"
              placeholder="Confirme sua senha"
              name="confirmPassword"
            />

            <Button type="submit">Cadastrar</Button>

            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
