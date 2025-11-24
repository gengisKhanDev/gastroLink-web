if (Meteor.isServer) {
	Accounts.emailTemplates.siteName = 'gastrolink';
	Accounts.emailTemplates.from = '<businessMail@gastrolink.com>';
	Accounts.emailTemplates.resetPassword = {
		subject(user) {
			return 'Reset Password';
		},
		html(user, url) {
			return `
			<!DOCTYPE html>
			<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1">
				<meta name="x-apple-disable-message-reformatting">
				<title></title>
				<link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">

			<body>
				<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">

					<tbody>
						<tr>
							<td align="center">
								<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
									<tbody>
										<tr>
											<td align="center" valign="top" bgcolor="#0000"
												style="background-size:cover; background-position:top;height=" 400""="">
												<table class="col-600" width="600" height="400" border="0" align="center" cellpadding="0"
													cellspacing="0">

													<tbody>
														<tr>
															<td height="40"></td>
														</tr>

														<tr>
															<td align="center"
																style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
																RESET <span
																	style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:39px; font-weight: 300; letter-spacing: 7px;">PASSWORD</span>
															</td>
														</tr>

														<tr>
															<td height="50"></td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td height="5"></td>
						</tr>

						<tr>
							<td align="center">
								<table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
									<tbody>
										<tr>
											<td align="center" bgcolor="#bfa688">
												<table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
													<tbody>
														<tr>
															<td height="33"></td>
														</tr>
														<tr>
															<td>


																<table align="left" class="col1" width="183" border="0" align="left" cellpadding="0"
																	cellspacing="0">

																	<tbody>
																		<tr>
																			<td height="18"></td>
																		</tr>

																		<tr align="left">
																			<td align="center">
																				<img
																					style="display:block; line-height:0px; font-size:0px; border:0px; margin-left:20px"
																					class="images_style"
																					src="https://designmodo.com/demo/emailtemplate/images/icon-title.png" alt="img"
																					width="156" height="136">
																			</td>

																		</tr>
																	</tbody>
																</table>

																<table class="col3_one" width="380" border="0" align="right" cellpadding="0" cellspacing="0">

																	<tbody>
																		<tr align="left" valign="top">
																			<td align="center"
																				style="font-family: 'Raleway', sans-serif; font-size:20px; color:#ffff; line-height:30px; font-weight: bold;">
																				Activation Required </td>
																		</tr>

																		<tr>
																			<td height="5"></td>
																		</tr>

																		<tr align="center" valign="top">
																			<td
																				style="font-family: 'Lato', sans-serif; font-size:13px; color:#fff; line-height:24px; font-weight: 300;">
																				Visit the following link to reset and set your password

																			</td>
																		</tr>

																		<tr>
																			<td height="10"></td>
																		</tr>

																		<tr align="left" valign="top">
																			<td>
																				<table align="center" class="button"
																					style="border: 2px solid #fff; border-radius: 30px; color: #ffffff;"
																					bgcolor="#a68d77" width="30%" border="0" cellpadding="0" cellspacing="0">
																					<tbody>
																						<tr>
																							<td align="center" width="20"></td>
																							<td align="center" height="50" align="center"
																								style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#ffffff;">
																								<a href="${url}" style="color:#ffffff;">Reset Password</a>
																							</td>
																							<td width="20"></td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr>

																	</tbody>
																</table>
															</td>
														</tr>
														<tr>
															<td height="33"></td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>

						<tr>
							<td align="center">
								<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
									style="margin-left:20px; margin-right:20px;">

									<tbody>
										<tr>
											<td align="center">
												<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
													style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
													<tbody>
														<tr>
															<td height="2"></td>
														</tr>
														<tr>
															<td align="right">
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>

										<tr>
											<td align="center">
												<table align="center" width="600" border="0" cellspacing="0" cellpadding="0"
													style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
													<tbody>
														<tr>
															<td height="2"></td>
														</tr>
														<tr>

															<td align="center" bgcolor="#bfa688">
																<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
																	<tbody>
																		<tr>
																			<td width="600" class="bg_dark email-section col-600" style="text-align:center;">
																				<div class="heading-section heading-section-white">

																					<h2 style="margin-bottom:-2px; color:#ffff;">or</h2>
																					<h2 style="color:#ffff;">copy and paste this link to your email address bar.</h2>
																					<p><a style="color:#ffff;" href="${url}">${url}</a></p>
																				</div>
																			</td>
																		</tr><

																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</body>
      `;
		},
	};

	Accounts.emailTemplates.enrollAccount = {
		subject(user) {
			return 'Welcome to GastroLink';
		},
		html(user, url) {
			return `
			<!DOCTYPE html>
			<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1">
				<meta name="x-apple-disable-message-reformatting">
				<title></title>
				<link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">

			<body>
				<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">

					<tbody>
						<tr>
							<td align="center">
								<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
									<tbody>
										<tr>
											<td align="center" valign="top" bgcolor="#0000"
												style="background-size:cover; background-position:top;height=" 400""="">
												<table class="col-600" width="600" height="400" border="0" align="center" cellpadding="0"
													cellspacing="0">

													<tbody>
														<tr>
															<td height="40"></td>
														</tr>

														<tr>
															<td align="center"
																style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:24px; font-weight: bold; letter-spacing: 7px;">
																WELCOME TO GASTROLINK<span
																	style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff; line-height:39px; font-weight: 300; letter-spacing: 7px;">
																	</span>
															</td>
														</tr>

														<tr>
															<td height="50"></td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td height="5"></td>
						</tr>

						<tr>
							<td align="center">
								<table align="center" class="col-600" width="600" border="0" cellspacing="0" cellpadding="0">
									<tbody>
										<tr>
											<td align="center" bgcolor="#bfa688">
												<table class="col-600" width="600" align="center" border="0" cellspacing="0" cellpadding="0">
													<tbody>
														<tr>
															<td height="33"></td>
														</tr>
														<tr>
															<td>


																<table align="left" class="col1" width="183" border="0" align="left" cellpadding="0"
																	cellspacing="0">

																	<tbody>
																		<tr>
																			<td height="18"></td>
																		</tr>

																		<tr align="left">
																			<td align="center">
																				<img
																					style="display:block; line-height:0px; font-size:0px; border:0px; margin-left:20px"
																					class="images_style"
																					src="https://designmodo.com/demo/emailtemplate/images/icon-title.png" alt="img"
																					width="156" height="136">
																			</td>

																		</tr>
																	</tbody>
																</table>

																<table class="col3_one" width="380" border="0" align="right" cellpadding="0" cellspacing="0">

																	<tbody>
																		<tr align="left" valign="top">
																			<td align="center"
																				style="font-family: 'Raleway', sans-serif; font-size:20px; color:#ffff; line-height:30px; font-weight: bold;">
																				Activation Required </td>
																		</tr>

																		<tr>
																			<td height="5"></td>
																		</tr>

																		<tr align="center" valign="top">
																			<td
																				style="font-family: 'Lato', sans-serif; font-size:13px; color:#fff; line-height:24px; font-weight: 300;">
																				We have created your account, please visit the link below to activate and set your
																				password

																			</td>
																		</tr>

																		<tr>
																			<td height="10"></td>
																		</tr>

																		<tr align="left" valign="top">
																			<td>
																				<table align="center" class="button"
																					style="border: 2px solid #fff; border-radius: 30px;" bgcolor="#a68d77" width="30%"
																					border="0" cellpadding="0" cellspacing="0">
																					<tbody>
																						<tr>
																							<td align="center" width="20"></td>
																							<td height="50" align="center"
																								style="font-family: 'Open Sans', Arial, sans-serif; font-size:13px; color:#ffffff;">
																								<a href="${url}" style="color:#ffffff;">Activate Account</a>
																							</td>
																							<td width="20"></td>
																						</tr>
																					</tbody>
																				</table>
																			</td>
																		</tr>

																	</tbody>
																</table>
															</td>
														</tr>
														<tr>
															<td height="33"></td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>

						<tr>
							<td align="center">
								<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
									style="margin-left:20px; margin-right:20px;">

									<tbody>
										<tr>
											<td align="center">
												<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
													style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
													<tbody>
														<tr>
															<td height="2"></td>
														</tr>
														<tr>
															<td align="right">
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>

										<tr>
											<td align="center">
												<table align="center" width="600" border="0" cellspacing="0" cellpadding="0"
													style=" border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
													<tbody>
														<tr>
															<td height="2"></td>
														</tr>
														<tr>

															<td align="center" bgcolor="#bfa688">
																<table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
																	<tbody>
																		<tr>
																			<td width="600" class="bg_dark email-section col-600" style="text-align:center;">
																				<div class="heading-section heading-section-white">

																					<h2 style="margin-bottom:-2px; color:#ffff;">or</h2>
																					<h2 style="color:#ffff;">copy and paste this link to your email address bar.</h2>
																					<p><a style="color:#ffff;" href="${url}">${url}</a></p>
																				</div>
																			</td>
																		</tr><!-- end: tr -->

																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</body>
      `;
		},
	};
}
