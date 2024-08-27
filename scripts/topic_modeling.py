from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer
import pinecone

def topic_modeling(text):
    vectorizer = CountVectorizer(max_df=0.95, min_df=2, stop_words='english')
    dtm = vectorizer.fit_transform([text])
    lda = LatentDirichletAllocation(n_components=5)
    lda.fit(dtm)
    return lda.components_

def update_pinecone_metadata(document_id, topics):
    pinecone.init(api_key='YOUR_API_KEY')
    index = pinecone.Index('document-index')
    index.update(id=document_id, set_metadata={'topics': topics})

if __name__ == "__main__":
    text = "Sample document text for topic modeling."
    topics = topic_modeling(text)
    update_pinecone_metadata('document_id', topics)
