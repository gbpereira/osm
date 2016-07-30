# encoding: utf-8
class Api::V1::GeocoderController < ApplicationController
  def index
    results = []
    data = Geocoder.search(params[:search])

    if data.any?
      results = data[0].data
      status = :success
    else
      status = :error
    end

    render json: { data: results, status: status }
  end
end
