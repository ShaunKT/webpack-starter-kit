// React
import React, { Fragment } from 'react';

// Helmet
import Helmet from 'react-helmet';

const HomePage = () => (
	<Fragment>
		<Helmet title="Webpack Starter Kit - Landing Page" />,
		<h1>Welcome to Webpack Starter Kit</h1>,
		<article>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas
			enim semper, congue nisl eu, ullamcorper odio. Ut a massa fringilla,
			interdum orci non, sagittis ex. Donec diam nisi, hendrerit eu felis ac,
			lacinia ullamcorper felis. Morbi ullamcorper tristique sodales. Curabitur
			placerat dolor ut commodo auctor. Ut pretium nunc et lectus egestas
			tempor. Aliquam eget tristique orci. Nam rhoncus vitae dui suscipit
			ornare. Morbi egestas augue non ligula mattis fringilla. Cras placerat
			quam id est efficitur, et sagittis mi pellentesque. Ut egestas ultricies
			tincidunt. Etiam sed gravida nibh. Nam id ligula eget mi tincidunt
			pulvinar nec non nisi.
		</article>
	</Fragment>
);

export default { component: HomePage };
