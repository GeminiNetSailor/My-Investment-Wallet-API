import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { Link } from "react-router-dom";

export const mainListItems = (
	<div>
		{/* <Link to='/transactions' style={{textDecoration: `none`}}>
			<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Transactions" />
			</ListItem>
		</Link> */}
		<Link to='/Transactions' style={{textDecoration: `none`}}>
			<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Transactions" />
			</ListItem>
		</Link>
		{/* <Link to={prop.path} style={{
			textDecoration: `none`
		}}>
			<ListItem button>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Monday" />
			</ListItem>
		</Link > */}
	</div>
)

export const secondaryListItems = (
	<div>

	</div>
);