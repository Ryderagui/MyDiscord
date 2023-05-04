import csrfFetch from "./csrf";



export const createMembership = (membership)=>async dispatch => {
    let res = await csrfFetch(`/api/community/${membership.communityId}/memberships`,{
        method: "POST",
        body: JSON.stringify(membership),
        headers: {
            'Content-Type':'application/json'
        }
    });
}

export const removeMembership = (membership)=>async dispatch => {
    let res = await csrfFetch(`/api/community/${membership.communityId}/memberships/${membership.id}`,{
        method: "DELETE",
        }
    );
}