import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
  constructor(props) {
    super(props);
    this.state        = {
        loadingApproval: false,
        loadingFinalize: false,
        readyToFinalize: props.request.approvalCount > props.approversCount / 2,
        approvalCount: props.request.approvalCount,
        complete: props.request.complete
    };
  };

  onApprove = async () => {
    const campaign = Campaign(this.props.address);
    this.setState({ loadingApproval: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0]
      });
      this.setState({ approvalCount: parseInt(this.state.approvalCount) + 1 });
      this.setState({ readyToFinalize: parseInt(this.state.approvalCount) > props.approversCount / 2 });
    } catch (err) {

    }
    this.setState({ loadingApproval: false });
  };

  onFinalize = async() => {
    const campaign = Campaign(this.props.address);
    this.setState({ loadingFinalize: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      });
      this.setState({ complete: true, readyToFinalize: false});
    } catch (err) {
      
    }
    this.setState({ loadingFinalize: false });
  };

  render() {

    const { Row, Cell } = Table;
    const { id, request, approversCount, manager, conta } = this.props;

    //this.setState({ readyToFinalize: request.approvalCount > approversCount / 2});
    //this.setState({ approvalCount: request.approvalCount });
    //const readyToFinalize = request.approvalCount > approversCount / 2;

    return (
      <Row disabled={this.state.complete} positive={this.state.readyToFinalize && !this.state.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')} ETH</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{this.state.approvalCount} / {approversCount}</Cell>
        <Cell>{this.state.complete ? null : (<Button
        color="green" basic onClick={this.onApprove}
        loading={this.state.loadingApproval}>Approve</Button>)}</Cell>
        <Cell>{this.state.complete ? null : (<Button
        color="teal" basic onClick={this.onFinalize}
        loading={this.state.loadingFinalize}>Finalize</Button>)}</Cell>
      </Row>
    );
  }
}

export default RequestRow;
