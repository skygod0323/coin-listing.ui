import React from 'react';
import Header from '../../layout/header';
import { Button, Container, Row, Col, Form, Table } from 'react-bootstrap';
import Api from '../../helper/api';

class Entry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            sort: '',
            email_percentage: 0,
            entries: []
        };

        // This binding is necessary to make `this` work in the callback
        this.addEntry = this.addEntry.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
        this.setSort = this.setSort.bind(this);
        this.setEmailPercentage = this.setEmailPercentage.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleEmailPercentageChange = this.handleEmailPercentageChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }

    addEntry() {
        if (!this.state.address) {
            alert('Input Token Address');
            return;
        }

        let param = {
            address: this.state.address
        }

        Api.addEntry(param).then(res => {
            this.loadEntries();
        })
    }

    setSort() {
        if (!this.state.sort) {
            alert('Please select default sort column');
            return;
        }

        let param = {
            key: 'default_sort',
            value: this.state.sort
        }

        Api.setSetting(param).then(res => {
            alert('successfully changed');
        })
    }

    setEmailPercentage() {
        if (!this.state.email_percentage) {
            alert('Please select default sort column');
            return;
        }

        let param = {
            key: 'email_percentage',
            value: this.state.email_percentage
        }

        Api.setSetting(param).then(res => {
            alert('successfully saved');
        })
    }

    removeEntry(i) {
        if (window.confirm("Do you really want to delete?")) {
            Api.removeEntry({id: this.state.entries[i].id}).then(res => {
                if (res.data.success) {
                    this.loadEntries();
                }
            })    
        }
    }

    handleSortChange(event) {
        this.setState({sort: event.target.value});
    }

    handleEmailPercentageChange(event) {
        this.setState({email_percentage: event.target.value});
    }

    handleAddressChange(event) {
        this.setState({address: event.target.value});
    }

    componentDidMount() {
        this.getEmailPercentage();
        this.getDefaultSort();
        this.loadEntries();
    }

    loadEntries() {
        Api.getEntries().then(res => {
            this.setState({entries: res.data});
        })
    }

    getDefaultSort() {
        Api.getSetting({key: 'default_sort'}).then(res => {
            this.setState({sort: res.data.value});
        })
    }

    getEmailPercentage() {
        Api.getSetting({key: 'email_percentage'}).then(res => {
            this.setState({email_percentage: res.data.value});
        })
    }

    render() {

        let entriesEls = this.state.entries.map((entry, index) => {
            return (
                <tr key={entry.id}>
                    <td style={{width: '5%'}}>{index + 1}</td>
                    <td style={{width: '17%'}}>{entry.name}</td>
                    <td style={{width: '80%'}}>{entry.address}</td>
                    <td>
                        <Button className="btn-sam" onClick={() => this.removeEntry(index)}>Remove</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div>
                <Header />
                <Container>
                    <div className="pt-3">
                        <Row>
                            <Col sm="10" className="mt-2">
                                <Form.Select  value={this.state.sort} onChange={this.handleSortChange} >
                                    <option>Select default sort</option>
                                    <option value="p_0">Price % variations last 30 minutes</option>
                                    <option value="p_1">Price % variations last 1 hours</option>
                                    <option value="p_2">Price % variations last 3 hours</option>
                                    <option value="p_3">Price % variations last 6 hours</option>
                                    <option value="p_4">Price % variations last 1 day</option>
                                    <option value="p_5">Price % variations last 1 week</option>

                                    <option value="t_0">Number transaction % variations last 30 minutes</option>
                                    <option value="t_1">Number transaction  % variations last 1 hours</option>
                                    <option value="t_2">Number transaction  % variations last 3 hours</option>
                                    <option value="t_3">Number transaction  % variations last 6 hours</option>
                                    <option value="t_4">Number transaction  % variations last 1 day</option>
                                    <option value="t_5">Number transaction  % variations last 1 week</option>

                                    <option value="h_0">Number holders  % variations last 30 minutes</option>
                                    <option value="h_1">Number holders % variations last 1 hours</option>
                                    <option value="h_2">Number holders % variations last 3 hours</option>
                                    <option value="h_3">Number holders % variations last 6 hours</option>
                                    <option value="h_4">Number holders % variations last 1 day</option>
                                    <option value="h_5">Number holders % variations last 1 week</option>
                                </Form.Select>
                            </Col>
                            <Col sm="2" className="mt-2 d-grid gap-2">
                                <Button onClick={this.setSort}>Set Default</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="10" className="mt-2">
                                <Form.Control type="number" placeholder="Percentage for Email"  value={this.state.email_percentage} onChange={this.handleEmailPercentageChange} />
                            </Col>
                            <Col sm="2" className="mt-2 d-grid gap-2">
                                <Button onClick={this.setEmailPercentage}>Save</Button>
                            </Col>
                            
                        </Row>

                        <Row>
                            <Col sm="10" className="mt-2">
                                <Form.Control type="text" placeholder="Token Address"  value={this.state.address} onChange={this.handleAddressChange} />
                            </Col>
                            <Col sm="2" className="mt-2 d-grid gap-2">
                                <Button onClick={this.addEntry}>Add Entry</Button>
                            </Col>
                            
                        </Row>
                    </div>

                    <div className="mt-2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entriesEls}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Entry;