import "./ProposalList.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from 'axios'
import cn from 'classnames';
import Button from '../../components/Button/Button'
import ProposalItem from '../../components/ProposalItem/ProposalItem'


function ProposalList() {
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [decisionsMade, setDecisionsMade] = useState(1)
    const [isPendingFilter, setIsPendingFilter] = useState(false)
    const [proposalItems, setProposalItems] = useState([]) // state hook

    const handleApproval = (id, approved) => {
      setLoading(true);
      setIsError(false);
      const data = {
        approved: approved,
      }
      axios.post('/c4p/' + id + "/decision", data).then(res => {
        setDecisionsMade(decisionsMade+1)
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        setIsError(true);
      });
    }

    function ApprovalButtons(item){
      if(item.status == "PENDING"){
      return <span><a onClick={() => handleApproval(item.id, true)} disabled={loading}  id="approve" >{loading ? 'Loading...' : 'Approve'}</a> /
      <a onClick={() => handleApproval(item.id,false)} disabled={loading}  id="reject" >{loading ? 'Loading...' : 'Reject'}</a></span>
      }else{
        return <span>No Actions</span>
      }
    }

    function ItemAction(status, id, action){

      if(status == "PENDING"){
        if(action == "APPROVE"){
          handleApproval(id, true)
        }else {
          handleApproval(id, false)
        }
      }
    }

    function PendingFilter(){
      setIsPendingFilter(true)
    }

    function AllFilter(){
      setIsPendingFilter(false)
    }

    useEffect(() => {

        axios({
          "method": "GET",
          "url": "/c4p/?pending="+isPendingFilter, // This is going through the proxy in package.json
          "headers": {

          }, "params": {

          }
        })
        .then((response) => {
          console.log("calling get proposals!" + "-> /c4p/?pending="+isPendingFilter)
          setProposalItems(response.data)
        })
        .catch((error) => {
          console.log(error)
        })

    }, [decisionsMade, isPendingFilter])

    return (
      <div className={  cn({
          ["ProposalList"]: true,
        })}>

            <div className="ProposalList__filters">
              <Button inverted state={isPendingFilter ? "inactive" : "active"} clickHandler={() => AllFilter()}>All</Button> <Button inverted state={isPendingFilter ? "active" : "inactive" } clickHandler={() => PendingFilter()}>Pending</Button>
            </div>
        

        <div>
        {
        proposalItems && proposalItems.map((item,index)=>(
              <ProposalItem
                key={item.id}
                id={item.id}
                title={item.title}
                author={item.author}
                description={item.description}
                email={item.email}
                approved={item.approved}
                status={item.status}
                actionHandler={ItemAction}
              />

          ))
        }
        {
          proposalItems && proposalItems.length === 0 && isPendingFilter === true && (
            <span>There are no pending proposals.</span>
          )
        }
        {
          proposalItems && proposalItems.length === 0 && isPendingFilter === false && (
            <span>There are no proposals.</span>
          )
        }
        </div>
      </div>
    );

}
export default ProposalList;

