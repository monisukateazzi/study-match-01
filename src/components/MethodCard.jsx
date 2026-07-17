import React from 'react';

export default function MethodCard({ method }) {
  const { name, category, difficulty, estimatedTime, shortDescription } = method;

      const getBadgeClass = (level) => {
          switch (level.toLowerCase()) {
                case 'easy': return 'badge badge-easy';
                      case 'medium': return 'badge badge-medium';
                            case 'hard': return 'badge badge-hard';
                                  default: return 'badge';
                                      }
                                        };

                                          return (
                                              <div className="method-card">
                                                    <div className="card-header">
                                                            <span className="card-category">{category}</span>
                                                                    <span className={getBadgeClass(difficulty)}>{difficulty}</span>
                                                                          </div>
                                                                                <h3 className="card-title">{name}</h3>
                                                                                      <p className="card-description">{shortDescription}</p>
                                                                                            <div className="card-footer">
                                                                                                    <span className="card-time">⏱️ {estimatedTime}</span>
                                                                                                          </div>
                                                                                                              </div>
                                                                                                                );
                                                                                                                }