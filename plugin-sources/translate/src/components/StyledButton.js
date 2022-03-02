/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  minWidth: '120px',
}));

const StyledMainButton = styled(StyledActionButton)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#7e9dbb',
  borderColor:'#6d90b2',
  '&:hover': {
    backgroundColor: '#5d84a9',
    color: theme.palette.common.white,
    borderColor: '#4e7294',
  }
}));

const StyledCancelButton = styled(StyledActionButton)(({ theme }) => ({
  color: '#333',
  backgroundColor: theme.palette.common.white,
  borderColor: '#ccc',
  '&:hover': {
    backgroundColor: '#e6e6e6',
    color: '#333',
    borderColor: '#adadad',
  }
}));

export { StyledCancelButton, StyledMainButton };
