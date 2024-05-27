import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Link,
} from "@react-email/components";

const VerificationEmail = ({
  verificationLink,
}: {
  verificationLink: string;
}) => (
  <Html>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Verify Your Email Address</Heading>
        <Text style={text}>
          Thank you for registering with us. Please click the button below to
          verify your email address.
        </Text>
        <Link href={verificationLink} style={button}>
          Verify Email
        </Link>
        <Text style={text}>
          If you did not create an account, no further action is required.
        </Text>
        <Text style={footer}>
          Best regards,
          <br />
          Your Company
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f6f6",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #dddddd",
  borderRadius: "5px",
  padding: "20px",
  margin: "20px auto",
  maxWidth: "600px",
};

const heading = {
  fontSize: "24px",
  marginBottom: "20px",
};

const text = {
  fontSize: "16px",
  marginBottom: "20px",
};

const button = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#ffffff",
  borderRadius: "5px",
  textDecoration: "none",
};

const footer = {
  fontSize: "14px",
  color: "#555555",
};

export default VerificationEmail;
