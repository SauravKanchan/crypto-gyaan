<script>
    import {
        Container, Button, Jumbotron, Col, Row, Card, CardBody, CardHeader, CardText, CardTitle
    } from 'sveltestrap';
</script>

<Jumbotron fluid class="p-3">
    <Container>
        <Row>
            <Col>
                <h1 class="display-3">Welcome to Crypto Gyaan</h1>
                <p class="lead">
                    Place where you can buy and sell your gyaan.
                </p>
            </Col>
        </Row>
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        <CardTitle>Create new wallet</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            Obtain an ETH address and generate your private key. Saving and safekeeping the key will be your responsibility.                        </CardText>
                        <Button>Create</Button>
                    </CardBody>
                </Card>

            </Col>
            <Col>
                <Card>
                    <CardHeader>
                        <CardTitle>Access my wallet</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            Buy and sell your precious gyaan by interacting with crypto gyaan smart contract.
                        </CardText>
                        <Button>Access</Button>
                    </CardBody>
                </Card>

            </Col>

        </Row>
    </Container>
</Jumbotron>