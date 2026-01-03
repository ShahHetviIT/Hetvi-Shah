import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Hetvi Shah | GenAI Engineer',
  description = 'Hetvi Shah - GenAI Engineer specializing in AI/ML, LLMs, and full-stack development. Explore my portfolio of innovative projects and technical expertise.',
  keywords = 'Hetvi Shah, GenAI Engineer, AI Engineer, Machine Learning, LLM, Full-Stack Developer, React, Node.js, Portfolio',
  image = '/favicon.png',
  url = 'https://hetvi-shah.vercel.app',
  type = 'website',
  author = 'Hetvi Shah'
}) => {
  const siteUrl = 'https://hetvi-shah.vercel.app';
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Hetvi Shah Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Hetvi Shah",
          "jobTitle": "GenAI Engineer",
          "url": siteUrl,
          "sameAs": [
            "https://github.com/hetvishah",
            "https://linkedin.com/in/hetvishah"
          ],
          "image": fullImageUrl,
          "description": description
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
