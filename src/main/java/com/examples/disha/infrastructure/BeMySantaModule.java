package com.examples.disha.infrastructure;

import com.examples.disha.repository.contract.WishRepository;
import com.examples.disha.repository.impl.WishRepositoryImpl;
import com.examples.disha.service.cintrf.WishService;
import com.examples.disha.service.impl.WishServiceImpl;
import com.google.inject.AbstractModule;

public class BeMySantaModule extends AbstractModule {
	@Override
	protected void configure() {

		bind(WishService.class).to(WishServiceImpl.class);
		bind(WishRepository.class).to(WishRepositoryImpl.class);
	}
}
