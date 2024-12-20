import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [dataset, setDataset] = useState<any[]>([]);
  const [selectedSquirrel, setSelectedSquirrel] = useState<any | null>(null); // creating state for selected squirrel entry
  const dataURL = "https://dev-kdurkin-sql.pantheonsite.io/wp-json/twentytwentyone-child/v1/squirrelsEndpoint";

  
  useEffect(() => {
    fetch(dataURL)
      .then(response => response.json())
      .then(data => setDataset(data));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="chip-title">Tree Squirrels Updates</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page-container">
          <h1 className="page-title">What's Up the Tree</h1>
          <div className="grid-container">
            {dataset.map((squirrel) => (
              <div
                key={squirrel.ID}
                className="grid-item"
                onClick={() => setSelectedSquirrel(squirrel)} // open modal with chipmunk details
              >
                <div className="card">
                  <div className="image-container">
                    <img
                      src={squirrel.video_still}
                      alt={squirrel.post_title || 'featured image'}
                      className="featured_image"
                    />
                  </div>
                  <h2 className="card-title">{squirrel.post_title || 'Untitled Image'}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* modal for chips  details */}
        <IonModal
  isOpen={!!selectedSquirrel}
  onDidDismiss={() => setSelectedSquirrel(null)}
  style={{
    '--background': '#04122d',
  }}
>
          <IonContent>
          <div className="modal-content3">
            {selectedSquirrel && (
              <IonCard>
                <IonCardHeader style={{ backgroundColor: selectedSquirrel.fav_color }}>
                  <IonCardTitle>
                  <h2>{selectedSquirrel.post_title}</h2>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                
                  <p className="ion-padding-y-05rem">
                  Message: {selectedSquirrel.post_content}
                   
                  </p>
                  <p className="ion-padding-y-05rem">
                    I am a <strong>{selectedSquirrel.common}</strong> and my Latin name is: <strong>{selectedSquirrel.latin}</strong> 
                  </p>
                  <hr/>
                 
                  <p>sincerely, <strong>{selectedSquirrel.first_name} {selectedSquirrel.last_name}</strong></p>
                  <IonButton className="modal-buttons" expand="block" onClick={() => setSelectedSquirrel(null)}>
                    Close
                  </IonButton>
                </IonCardContent>
              </IonCard>
            )}
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;