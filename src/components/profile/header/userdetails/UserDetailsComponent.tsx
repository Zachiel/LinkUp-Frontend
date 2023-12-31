/**
 * @module UserDetailsComponent
 * @description A React component for displaying user details in a profile header.
 */

import { getUserDetails } from '@middleware/userHandler';
import React, { useEffect, useState } from 'react';
import AboutComponent from './AboutComponent';
import PhotoComponent from './PhotoComponent';

/**
 * A React component for displaying user details in a profile header.
 *
 * This component is responsible for rendering the user details within a profile header. It can be used to display information such as the user's name, profile picture, or any other relevant user details.
 *
 * @component
 * @returns {JSX.Element} - The rendered user details component.
 * @example
 * // Import and use the component within a profile header
 * <UserDetailsComponent />
 */
interface UserDetails {
	username: string;
	email: string;
}

const UserDetailsComponent = (): JSX.Element => {
	const [userDetails, setUserDetails] = useState<UserDetails | null>();

	useEffect(() => {
		const fetchUserDetails = async () => {
			const userDetailsDB: UserDetails = await getUserDetails();
			setUserDetails(userDetailsDB);
		};
		fetchUserDetails();
	}, []);

	return (
		<div className='profile__header_user-details'>
			<PhotoComponent />
			<div className='profile__header_user-details-user'>
				<div className='profile__header_user-details-name'>
					<p className='label'>Name:</p>
					{userDetails ? (
						<p className='field'> {userDetails.username}</p>
					) : null}
				</div>
				<div className='profile__header_user-details-email'>
					<p className='label'>e-mail:</p>
					{userDetails ? (
						<p className='field'>{userDetails.email}</p>
					) : null}
				</div>
			</div>
			<div className='profile__header_user-details-about'>
				<p className='label'>About me:</p>
				<AboutComponent />
			</div>
		</div>
	);
};

export default UserDetailsComponent;
