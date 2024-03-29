import { useState } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import useHttpRequest from '../../../../hook/use-http';

import { queryClient, useMutation } from "../fetchForQuery";

const ExplainSectionCardMoreButton = ({refId, queryKey}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { sendDelRequest } = useHttpRequest();

  const delReferenceMutation = useMutation({
    mutationFn: async() => {
      await sendDelRequest({
        endpoint: `/question/ref/${refId}`
      })
    },
    onSuccess: () => {
      queryClient.refetchQueries({queryKey : [queryKey], exact: true});
    }
  })

  const menuClickHandler = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = () => {
    if(window.confirm("등록하신 레퍼런스를 삭제하시겠습니까?")){
      delReferenceMutation.mutate();
    }
  } 

  return (
    <>
      <MoreHorizIcon sx={{ cursor: 'pointer', marginLeft: 'auto' }} onClick={menuClickHandler} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ paddintTop: 0, paddingBottom: 0 }}
      >
        <MenuItem
          onClick={() => {
            deleteHandler();
            handleClose();
          }}
          sx={{ fontSize: '13px', color: 'red' }}
        >
          삭제
        </MenuItem>
      </Menu>
    </>
  );
};

export default ExplainSectionCardMoreButton;
